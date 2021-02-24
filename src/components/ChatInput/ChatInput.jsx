import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './ChatInput.scss'
import { Button } from '@material-ui/core'
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import firebase from 'firebase';
function ChatInput({ channelName, channelId}) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        userImage: user.photoURL,
      })
      .then(() => setInput(""))
      .catch(err => alert(err.message));
    }
  }

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text" 
          placeholder={`Message #${channelName}`}
        />
        <Button type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  )
}

ChatInput.propTypes = {
  channelName: PropTypes.string,
  channelId: PropTypes.string,
}
ChatInput.defaultProps = {
  channelName: "",
  channelId: null,
}

export default ChatInput

