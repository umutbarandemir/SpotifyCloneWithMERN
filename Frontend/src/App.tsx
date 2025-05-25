
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home.tsx";
import AuthCallback from './pages/authCallback/AuthCallback.tsx';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout.tsx';
import Chat from './pages/chat/Chat.tsx';
import Album from './pages/album/Album.tsx';
import { Toaster } from "react-hot-toast";

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}/>
			<Route path='/auth-callback' element={<AuthCallback />} />

      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/albums/:albumId' element={<Album />} />
      </Route>
    </Routes>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    </>
  )
}

export default App
