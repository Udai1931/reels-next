import '../styles/globals.css'
import './login.css'
import './signup.css'
import 'pure-react-carousel/dist/react-carousel.es.css';
import AuthProvider, { AppContext } from '../context/auth'

function MyApp({ Component, pageProps }) {
  console.log("App")
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp