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
function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
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

function Chat(props) {
  const { auth } = props;
  console.log('AUTH', auth);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState([]);
  const [width, height] = useSizeComponents();
  const [disabled, setDisabled] = useState(false);
  const scaleLottie = 0.5;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const n8nCall = (e) => {
    console.log('getGptResponse', e);
    console.log(e.target[0].value);

    setLoading(true);
    setDisabled(true);
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
        setInputMessage('');
        setDisabled(false);
      })
      .catch((err) => {
        setInputMessage('');
        setLoading(false);
        setDisabled(false);
        console.log(err);
      });
  };

  const control = useMemo(() => {
    if (!width) return null;
    if (width < 600) return <Lottie key={width} options={defaultOptions} />;
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
          {auth.isAuthenticated ? (
            <>
              {loading && control}
              {!loading && agentResponse && (
                <div class="responseSectionContainer">
                  {agentResponse.map((category) => {
                    return (
                      <div class="response-container">
                        <h1 class="response-title">
                          {capitalize(category.category)}
                        </h1>
                        {category.ideas.map((idea) => {
                          return (
                            <p class="response-subtitle">{capitalize(idea)}</p>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <HeroSection></HeroSection>
          )}
        </div>
        <input
          class="mainInput"
          type="text"
          placeholder="Tell me something about your friend"
          value={inputMessage}
          onChange={(ev) => setInputMessage(ev.target.value)}
          disabled={disabled || !auth.isAuthenticated}
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
