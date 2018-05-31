import React from 'react';
import TopMenu from 'components/TopMenu';
import SideMenu from 'components/Dashboard/Sidebar';

export default props => (
  <div className='dashboard grid'>
    <div className='dashboard menu'>
      <TopMenu toggleSideMenu={props.toggleSideMenu}/>
    </div>
    <div className='dashboard main-content'>
      <SideMenu smallMenu={props.smallMenu} activeItem={props.activeItem}>
        {props.children}
      </SideMenu>
    </div>
  </div>
);
