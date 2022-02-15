import '../styles/globals.css'
import './login.css'
import './signup.css'
import './profile.css'
import 'pure-react-carousel/dist/react-carousel.es.css';
import AuthProvider, { AppContext } from '../context/auth'
import './login1.css'
import '../components/post.css'
function MyApp({ Component, pageProps }) {
  console.log("App")
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp