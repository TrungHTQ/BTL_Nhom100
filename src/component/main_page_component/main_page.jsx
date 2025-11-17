import React from 'react';
import NavBar from '../nav_bar_component/nav_bar';

export default function MainPage({ user, onLogoutClick, onDashBoardClick }) {
  return (
    <>
      <NavBar user={user} onLogoutClick={onLogoutClick} onDashBoardClick={onDashBoardClick} />
      <div id="container" style={{marginTop: '56px', textAlign: 'center'}}>
        <h2>Xin chào, {user.email}!</h2>
        {/* Thêm nội dung dashboard hoặc các thành phần khác tại đây */}
      </div>
    </>
  );
}
