import React from 'react'
import PropTypes from 'prop-types'
import './Message.scss'
import { useStateValue } from '../../context/StateProvider'

function Message({ message, timestamp, username, userImage}) {
  const [{ user }] = useStateValue();
  const messageToRight = user.displayName === username ? 
  "message-to-right message" : "message";

  return (
    <div className={messageToRight}>
      <img src={userImage} alt={`${username}'s avatar`} />
      <div className="message__info">
        <h4>
          {username}
          <span className="message__info__timestamp">{new Date(timestamp?.toDate()).toUTCString().replace('GMT', '')}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  timestamp: PropTypes.object,
  username: PropTypes.string,
  userImage: PropTypes.string,
}
Message.defaultProps = {
  message: "",
  timestamp: null,
  username: "",
  userImage: "",
}

export default Message

