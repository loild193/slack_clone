import { Button } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import './ChatInput.scss';
function ChatInput({ channelName, channelId, room }) {
  const inputRef = useRef(null);
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection(room ? 'rooms' : 'teammates')
        .doc(channelId)
        .collection('messages')
        .add({
          message: inputRef.current.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user.displayName,
          userImage: user.photoURL,
        })
        .then(() => inputRef.current.value = "")
        .catch(err => alert(err.message));
    }
  }

  return (
    <div className="chatInput">
      <form>
        <input
          ref={inputRef}
          onChange={(e) => inputRef.current.value = e.target.value}
          type="text" 
          placeholder={`Message to ${channelName}`}
        />
        <Button type="submit" onClick={sendMessage}>
          <Send />
        </Button>
      </form>
    </div>
  )
}

ChatInput.propTypes = {
  channelName: PropTypes.string,
  channelId: PropTypes.string,
  room: PropTypes.bool,
}
ChatInput.defaultProps = {
  channelName: "",
  channelId: null,
  room: false,
}

export default ChatInput

