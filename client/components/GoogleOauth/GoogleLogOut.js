import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '67500047765-oj928l0bem24tr3vc71m8gmlp5ij0bre.apps.googleusercontent.com';

function GLogout() {
  const onSuccess = () => {
    console.log('Logout successfully');
    alert('Logout!');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        isGoogleLogedIn={false}
      ></GoogleLogout>
    </div>
  );
}

export default GLogout;
