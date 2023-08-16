import React from 'react';
import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
//useAuthStateは、現在のログイン情報を取得するためのコンポーネント
import { auth, provider } from './firebase';
import Home from './components/Home';
import Button from '@mui/material/Button';
import { signInWithPopup } from 'firebase/auth';

function App() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
}
  return (
    <div className="App">
      {user ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <Button variant="contained" onClick={signInWithGoogle}>Sign In With Google</Button>
        </>
      )}

    </div>
  );
}

export default App;
