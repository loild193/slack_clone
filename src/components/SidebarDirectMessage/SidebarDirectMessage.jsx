import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import db from '../../firebase';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';

function SidebarDirectMessage(props) {
  const { 
    uid1, uid2, 
    username1, username2,
    userImage1, userImage2, 
    addTeammate,
    Icon, title, id,
  } = props;
  const [receiver, setReceiver] = useState(null);
  const [alreadyReceiver, setAlreadyReceiver] = useState(null);
  const [{ user }] = useStateValue();
  const history = useHistory();

  const isAlreadyInDBRef = useRef(false);

  useEffect(() => {
    user.displayName === username1 ?
    setAlreadyReceiver({
      username: username2,
      userImage: userImage2,
    }) :
    setAlreadyReceiver({
      username: username1,
      userImage: userImage1,
    })
    // return setAlreadyReceiver(null);
  }, [username1, username2, user, userImage1, userImage2]);

  useEffect(() => {
    const addUserToDB = async () => {
      await checkUser(user.email, 'users');
      isAlreadyInDBRef.current ? 
        isAlreadyInDBRef.current = false
        : 
        db.collection('users')
          .add({
            email: user.email,
            uid: user.uid,
            userImage: user.photoURL,
            username: user.displayName,
          })
    }
    addUserToDB();
  }, [user]);

  const checkUser = async (email, collectionName, addToTeammate = false) => {
    const querySnapshot = await db.collection(collectionName).get();
    
    querySnapshot.forEach(doc => {
      if (doc.data().email === email) {
        isAlreadyInDBRef.current = true;
        addToTeammate && alert(`Email ${email} has already in DB`);
      }
    })
  }
  const findUser = async (email) => {
    const querySnapshot = await db.collection('users').get()
    querySnapshot.forEach(doc => {
      if (doc.data().email === email) {
        setReceiver(doc.data());
      }
    })
    receiver === null && alert(`User with email ${email} not found`);
  }
  const addUserToTeammate = () => {
    isAlreadyInDBRef.current ? 
      isAlreadyInDBRef.current = false
    : 
      db.collection('teammates')
        .add({
          uid1: user.uid,
          uid2: receiver?.uid,
          username1: user.displayName,
          username2: receiver?.username,
          userImage1: user.photoURL,
          userImage2: receiver?.userImage,
        })
  }

  const addNewTeammate = async () => {
    const email = prompt('Please enter the teammate email: ');

    if (email) {
      // find account
      await findUser(email);
      // add teammate
      // 1. Check user is already in db ?
      await checkUser(email, 'teammates', true);
      // 2. Add to DB
      addUserToTeammate();
    }
  }

  const selectTeammate = () => {
    uid2 && history.push(`/teammate/${id}`);
  }

  return (
    <div 
      className="sidebarOption"
      onClick={addTeammate ? addNewTeammate : selectTeammate}
    >
      { Icon && <Icon className="sidebarOption__icon" />}
      { 
        Icon ? 
        <h3>{title}</h3> : 
        <h3 className="sidebarOption__channel">
          <img className="sidebarOption__avatar" src={alreadyReceiver?.userImage} alt="avatar" />
          {alreadyReceiver?.username}
        </h3>  
      }
    </div>
  )
}

SidebarDirectMessage.propTypes = {
  username1: PropTypes.string,
  username2: PropTypes.string,
  userImage1: PropTypes.string,
  userImage2: PropTypes.string,
  addTeammate: PropTypes.bool,
  uid1: PropTypes.string,
  uid2: PropTypes.string,
  Icon: PropTypes.any,
  title: PropTypes.string,
  id: PropTypes.string,
}
SidebarDirectMessage.defaultProps = {
  username1: "",
  username2: "",
  userImage1: "",
  userImage2: "",
  addTeammate: false,
  uid1: "",
  uid2: "",
  Icon: null,
  title: "",
  id: "",
}

export default SidebarDirectMessage