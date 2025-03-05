import { useState } from 'react';
import { GrSend } from 'react-icons/gr';
import Lottie from 'react-lottie';
import animationData from './lotties/gift-on-the-way.json';
import './heroSection.css';

function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const n8nCall = (e) => {
    console.log('getGptResponse', e);
    console.log(e.target[0].value);
    setLoading(true);
    // fetch(
    //   'https://trialplanner.app.n8n.cloud/webhook/b55a7a6b-e605-424f-af6a-c5429f6e045a',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({ chatInput: e.target[0].value }),
    //   }
    // )
    fetch(
      'https://trialplanner.app.n8n.cloud/webhook-test/b55a7a6b-e605-424f-af6a-c5429f6e045a',
      {
        method: 'POST',
        body: JSON.stringify({ chatInput: e.target[0].value }),
      }
    )
      .then((response) => {
        console.log('got data', response);
        return response.text();
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

  const HeroSection = () => {
    return (
      <div class="heroSectionContainer">
        <section class="hero-section">
          <div class="hero-container">
            <h1 class="hero-title">
              Transform Your Business
              <br />
              With Innovative Solutions
            </h1>
            <p class="hero-subtitle">
              Discover cutting-edge strategies that drive growth, enhance
              productivity, and unlock your company's full potential.
            </p>
            <div class="hero-buttons">
              <a href="#" class="btn btn-primary">
                Get Started
              </a>
              {/* <a href="#" class="btn btn-secondary">
                Learn More
              </a> */}
            </div>
          </div>
        </section>
      </div>
    );
  };

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
          {loading && <Lottie options={defaultOptions} />}
          {!loading && <HeroSection />}
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
