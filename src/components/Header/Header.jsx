import React from 'react'
import './Header.scss'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function Header(props) {
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
          // alt={user?.displayName}
          // src={user?.photoURL}
          alt="Me"
          src=""
        />
      </div>
    </div>
  )
}

Header.propTypes = {

}

export default Header

