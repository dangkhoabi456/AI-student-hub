
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

// Client ID lấy từ ảnh chụp của bạn
const GOOGLE_CLIENT_ID = "8162820576094clrdj4f4mp1jh72m40ffaf04fne6vhe.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
)