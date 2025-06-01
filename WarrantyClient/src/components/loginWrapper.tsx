import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './login';
import { getClientId } from '../App';

function LoginWrapper() {
  return (
    <GoogleOAuthProvider clientId={getClientId()}>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default LoginWrapper;
