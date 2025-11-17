import React from 'react';
import './nav_bar.css';

export default function NavBar({ user, onLoginClick, onLogoutClick, onDashBoardClick }) {
  return (
    <nav className="navbar">
      {user ? (
        <div className="navbar__left">
          <span className="navbar__brand">Hệ thống nhúng</span>
          <button className="navbar__btn" onClick={onDashBoardClick}>DashBoard</button>
        </div>
      ) : (
        <div className="navbar__left">
          <span className="navbar__brand">Nhóm 100</span>
        </div>
      )}
      <div className="navbar__right">
        {user ? (
          <>
            <span className="navbar__user">{"Xin chào " + user.email}</span>
            <button className="navbar__btn" onClick={onLogoutClick}>Đăng xuất</button>
          </>
        ) : (
            <button className="navbar__btn" onClick={onLoginClick}>Đăng nhập</button>
        )}
      </div>
    </nav>
  );
}
