import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './login';

const clientId = '499294204608-4qkg63tbtemr6dsna5ucqc20pidif0r6.apps.googleusercontent.com';
console.log(clientId, "clientId");

function LoginWrapper() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default LoginWrapper;
