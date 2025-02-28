import logo from './logo.svg';
import './App.css';
import Home from './Home';

// App.js

import { useAuth } from 'react-oidc-context';
import Chat from './Chat';

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = '3tu012q845tpuispds9jo24usf';
    const logoutUri = '<logout uri>';
    const cognitoDomain = 'https://<user pool domain>';
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

  if (auth.isAuthenticated) {
    return (
      <div>
        <Home></Home>
        <Chat></Chat>
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

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
