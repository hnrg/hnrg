import React from 'react';
import TopMenu from 'components/TopMenu';
import SideMenu from 'components/Dashboard/Sidebar';

export default props => (
  <div className='grid'>
    <div className='menu'>
      <TopMenu toggleSideMenu={props.toggleSideMenu}/>
    </div>
    <div className='main-content'>
      <SideMenu smallMenu={props.smallMenu}>
        {props.children}
      </SideMenu>
    </div>
  </div>
);
