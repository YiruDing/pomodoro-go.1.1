import React from 'react';
import { GoogleLogin } from 'react-google-login';
// import GoogleButton from 'react-google-button';
// refresh token
import { Button } from '@material-ui/core';
import { refreshTokenSetup } from './RefreshToken';

const clientId =
  '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com';

function GLogin() {
  const onSuccess = (res) => {
    console.log('Login Success! CurrentUser:', res.profileObj);
    alert(`Logged in with Gmail! Welcome,${res.profileObj.name}`);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };
  const handleClick = () => {
    if (chrome.identity) {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        chrome.storage.sync.set({ googleAuthToken: token });
      });
    }
  };
  return (
    <div className={'Google-button'}>
      {/* <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        // render={(renderProps) => (
        //   <GoogleButton
        //     id="googleButton"
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //   />
        // )}
        isGoogleLogedIn={true}
      /> */}
      <Button onClick={handleClick}>Login</Button>
    </div>
  );
}

export default GLogin;
