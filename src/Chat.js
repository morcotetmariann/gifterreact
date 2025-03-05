import { useState, useLayoutEffect, useMemo } from 'react';
import { GrSend } from 'react-icons/gr';
import Lottie from 'react-lottie';
import animationData from './lotties/gift-on-the-way.json';
import HeroSection from './HeroSection';
import './responseSection.css';

export function useSizeComponents(ref) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      let newSize = [window.innerWidth, window.innerHeight];
      if (ref?.current) {
        newSize = [ref.current.offsetWidth, ref.current.offsetHeight];
      }
      setSize(newSize);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

const mockResponse = [
  {
    category: 'Books',
    ideas: [
      'The Overstory by Richard Powers',
      'The 7 Habits of Highly Effective People by Stephen Covey',
      'The Alchemist by Paulo Coelho',
    ],
  },
  {
    category: 'Cooking/Kitchen',
    ideas: [
      'A cookbook featuring plant-based recipes',
      "A high-quality chef's knife",
      'A set of reusable produce bags',
    ],
  },
  {
    category: 'Sustainability/Eco-friendly',
    ideas: [
      'A subscription to a monthly eco-friendly product box',
      'A reusable water bottle',
      'A set of beeswax wraps',
    ],
  },
  {
    category: 'Travel/Outdoor',
    ideas: [
      'A weekend getaway to a nearby national park',
      'A high-quality hiking backpack',
      'A camping hammock',
    ],
  },
  {
    category: 'General',
    ideas: [
      'A spa day',
      'A personalized piece of jewelry',
      'A gift card to her favorite store or restaurant',
    ],
  },
];

function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [agentResponse, setAgentResponse] = useState(mockResponse);
  const [agentResponse, setAgentResponse] = useState([]);
  const [width, height] = useSizeComponents();
  const scaleLottie = 0.5;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: 'xMidYMid slice',
    // },
  };

  const n8nCall = (e) => {
    console.log('getGptResponse', e);
    console.log(e.target[0].value);
    setInputMessage('');
    setLoading(true);
    fetch(
      'https://trialplanner.app.n8n.cloud/webhook/b55a7a6b-e605-424f-af6a-c5429f6e045a',
      {
        method: 'POST',
        body: JSON.stringify({ chatInput: e.target[0].value }),
      }
    )
      // fetch(
      //   'https://trialplanner.app.n8n.cloud/webhook-test/b55a7a6b-e605-424f-af6a-c5429f6e045a',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({ chatInput: e.target[0].value }),
      //   }
      // )
      .then((response) => {
        console.log('got data', response);
        return response.json();
      })
      .then((data) => {
        console.log('got data', data);
        setAgentResponse(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const control = useMemo(() => {
    if (!width) return null;
    const xMidYMid = 0.5;
    const sizeComponent = {
      width: width * scaleLottie,
      height: width * scaleLottie * xMidYMid,
    };
    return <Lottie key={width} options={defaultOptions} {...sizeComponent} />;
  }, [width]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        n8nCall(e);
      }}
      class="inputContainer"
    >
      <div className="glass">
        <div class="contentContainer">
          {
            loading && control
            // <div style={{ maxHeight: '100%' }}>
            //   <Lottie options={defaultOptions} />
            // </div>
          }
          {!loading && agentResponse && (
            <div class="responseSectionContainer">
              {agentResponse.map((category) => {
                return (
                  <div class="response-container">
                    <h1 class="response-title">{category.category}</h1>
                    {category.ideas.map((idea) => {
                      return <p class="response-subtitle">{idea}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <div style={{ position: 'relative' }}>
          <div class="box">
            <span>J</span>
            <span>U</span>
            <span>M</span>
            <span>P</span>
            <span>!</span>
          </div>
        </div> */}
        <input
          class="mainInput"
          type="text"
          placeholder="Write the description of a friend or pet friend here"
          value={inputMessage}
          onChange={(ev) => setInputMessage(ev.target.value)}
        ></input>
        <div class="buttonContainer">
          <button type="submit" class="inputButton">
            <GrSend
              style={{ color: 'hsl(262, 42%, 62%)' }}
              size="2rem"
            ></GrSend>
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

export default Chat;
