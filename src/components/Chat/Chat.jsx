import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Chat.scss'
import { useParams } from 'react-router-dom'
import { InfoOutlined, PersonAdd, StarBorderOutlined } from '@material-ui/icons';
import db from '../../firebase';
import Message from '../Message/Message';

function Chat(props) {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
      .doc(roomId)
      .onSnapshot(snapshot => (
        setRoomDetails(snapshot.data())
      ))

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => 
          setRoomMessages(snapshot.docs.map(doc => doc.data()))
         )
    } 
  }, [roomId]);

  console.log(roomMessages)

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header__left">
          <h4 className="chat__channel-name">#{roomDetails?.name}</h4>
          <StarBorderOutlined titleAccess="Star channel" />
        </div>

        <div className="chat__header__right">
          <PersonAdd titleAccess={`Add people to #${roomDetails?.name}`} />
          <InfoOutlined titleAccess="Show channel details" />
        </div>
      </div>

      <div className="chat__message">
        {
          roomMessages?.map(({ message, timestamp, username, userImage}) => 
            <Message
              key={timestamp}
              message={message}
              timestamp={timestamp}
              username={username}
              userImage={userImage}
            />
          )
        }
      </div>
    </div>
  )
}

Chat.propTypes = {

}

export default Chat

