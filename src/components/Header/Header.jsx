import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import './Header.scss';

function Header(props) {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__search">
        <AccessTimeIcon className="header__access-icon" titleAccess="History"/>
        <input placeholder="Search anything..." />
        <HelpOutlineIcon className="header__help-icon" titleAccess="Help"/>
      </div>

      <div className="header__right">
      <Avatar 
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
      </div>
    </div>
  )
}

Header.propTypes = {

}

export default Header

