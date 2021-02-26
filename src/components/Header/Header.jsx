import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { auth } from '../../firebase';
import './Header.scss';

function Header(props) {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    handleClose();
    await auth.signOut();
    localStorage.removeItem('user');
    dispatch({
      type: actionType.SET_USER,
      payload: null,
    })
    history.push('/sign-in');
  }

  return (
    <div className="header">
      <div className="header__search">
        <AccessTimeIcon className="header__access-icon" titleAccess="History"/>
        <input placeholder="Search anything..." />
        <HelpOutlineIcon className="header__help-icon" titleAccess="Help"/>
      </div>

      <div 
        className="header__right"
      >
        <Avatar 
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <Button size="small" variant="outlined" color="secondary" onClick={handleClickOpen}>
          Sign Out
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to sign out ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignOut} color="primary" autoFocus>
              ok
            </Button>
            <Button onClick={handleClose} color="secondary" autoFocus>
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

Header.propTypes = {

}

export default Header

