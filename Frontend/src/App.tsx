
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.tsx";
import AuthCallback from './pages/authCallback/AuthCallback.tsx';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}/>
      <Route path='/' element={<Home />} />
			<Route path='/auth-callback' element={<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App
