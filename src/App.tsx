import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
//useAuthStateは、現在のログイン情報を取得するためのコンポーネント
import { auth } from './firebase';
import Home from './components/Home';
import Auth from './components/Auth';

const App: React.FC = () => {
  // const [user] = useAuthState(auth); firebaseのhooks どっちがいいのかな？
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // sign in と sign outでトリガーされるfirebaseの関数 ユーザーの変化を監視する。
    // 監視をやめる関数を返すのでubSubで受け取っておく 後でreturnで呼ぶ
    const unSub = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        console.log("appの最初")
        dispatch(
          login({ // userSliceで定義しているreducer action.payloadを渡す
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        )
      } else {
        dispatch(logout());
      }
    })
    return () => {
      unSub()
    }

  },[dispatch]);

  return (
    <div className="App">
      {user.uid ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <Auth />
        </>
      )}

    </div>
  );
}

export default App;
