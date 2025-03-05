import { useState } from 'react';
import { GrSend } from 'react-icons/gr';

function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const n8nCall = (e) => {
    console.log('getGptResponse', e);
    console.log(e.target[0].value);
    fetch(
      'https://trialplanner.app.n8n.cloud/webhook-test/b55a7a6b-e605-424f-af6a-c5429f6e045a',
      {
        method: 'POST',
        body: JSON.stringify({ chatInput: e.target[0].value }),
      }
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
