import React, { useState, useEffect } from 'react';
import LoginForm from './component/login_component/LoginForm';
import MainPage from './component/main_page_component/main_page';
import NavBar from './component/nav_bar_component/nav_bar';

import { auth } from "./dtb/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

    // Hàm dashboard click (placeholder)
    const handleDashBoardClick = () => {
      alert('Chuyển đến Dashboard!');
    };

    // Hàm login: focus vào ô email nếu đang ở trang đăng nhập
    const handleLoginClick = () => {
      const input = document.getElementById('container-loginForm__username');
      if (input) input.focus();
    };

    return (
      <div className="App">
        <NavBar
          user={user}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogout}
          onDashBoardClick={handleDashBoardClick}
        />
        <div style={{marginTop: '56px'}}>
          {!user ? <LoginForm /> : <MainPage user={user} onLogoutClick={handleLogout} onDashBoardClick={handleDashBoardClick} />}
        </div>
      </div>
    );
    
}

export default App;
