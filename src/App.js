import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useState } from 'react';
// import Paylike from 'paylike';
// App.js

import { useAuth } from 'react-oidc-context';
import Chat from './Chat';

function App() {
  const auth = useAuth();
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const key = '2ae0549d-4872-43fc-bc34-c4997c3b9ccd';
  const paylike = window.Paylike({ key });

  function pay() {
    console.log('TRIED?!?!?');
    paylike.pay(
      {
        // locale: 'da',  // pin popup to a locale
        test: true,
        title: 'Gifter App',
        description: 'Discover Perfect Gifts with AI Magic!',

        amount: { currency: 'EUR', exponent: 2, value: 19995 },

        // saved on transaction for retrieval from dashboard or API
        custom: {
          // arrays are fine
          products: [
            // nested objects will do
            { SKU: 'VMJ', quantity: 2 },
            { SKU: 'UFB', quantity: 1 },
          ],
        },

        // data from fields will be merged with custom
        fields: [
          // elaborate custom field
          {
            name: 'email',
            type: 'email',
            label: 'E-mail',
            placeholder: 'user@example.com',
            required: true,
          },

          // simple custom field
          'note',
        ],
      },
      (err, res) => {
        if (err) return console.log(err);

        console.log(res);
        // location.href = '/thank-you'
      }
    );
  }

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value) => {
    setDropdownValue(value);
    setDropdownState(!dropdownState);
  };

  const signOutRedirect = () => {
    const clientId = '3tu012q845tpuispds9jo24usf';
    const logoutUri = 'https://gifterapp.click';
    const cognitoDomain =
      'https://us-east-16e0jpb8az.auth.us-east-1.amazoncognito.com';
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }
  console.log('WINDOW', window);
  return (
    <div>
      <Home></Home>
      <div className="main">
        <div className="container">
          <div className={`dropdown`}>
            {auth.isAuthenticated ? (
              <button
                onClick={handleDropdownClick}
                className="dropdown-btn transparentButton userEmail"
              >
                {auth.user?.profile.email.split('@')[0]}
              </button>
            ) : (
              <button
                onClick={handleDropdownClick}
                className="dropdown-btn transparentButton rounded"
              >
                <MdOutlineAccountCircle
                  size="2.5rem"
                  style={{ color: 'hsl(262, 42%, 62%)' }}
                />
              </button>
            )}
            <div
              className={`dropdown-items ${
                dropdownState ? 'isVisible' : 'isHidden'
              }`}
            >
              {auth.isAuthenticated ? (
                <>
                  <div className="dropdown-item">
                    <button id="paylikePopup" onClick={() => pay()}>
                      Pay
                    </button>
                    {/* <div
                    className="dropdown__link"
                    onClick={() => handleSetDropdownValue('value 02')}
                  >
                    Item 02
                  </div> */}
                  </div>
                  <div className="dropdown-item">
                    <button onClick={() => signOutRedirect()}>Sign out</button>
                    {/* <div
                    className="dropdown__link"
                    onClick={() => handleSetDropdownValue('value 02')}
                  >
                    Item 02
                  </div> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-item">
                    <button onClick={() => auth.signinRedirect()}>
                      Sign in
                    </button>
                    {/* <div
                    className="dropdown__link"
                    onClick={() => handleSetDropdownValue('value 01')}
                  >
                    Item 01
                  </div> */}
                  </div>
                  <div className="dropdown-item">
                    <button onClick={() => signOutRedirect()}>Sign out</button>
                    {/* <div
                    className="dropdown__link"
                    onClick={() => handleSetDropdownValue('value 02')}
                  >
                    Item 02
                  </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Chat></Chat>
      </div>

      {/* <Chat></Chat> */}
      {/* <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div> */}
    </div>
  );
}

export default App;
