import { InfoOutlined, PersonAdd, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import ChatInput from '../ChatInput/ChatInput';
import Message from '../Message/Message';
import './Chat.scss';

function Chat(props) {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);

  const chatRef = useRef(null);
  const chatMessageRef = useRef(null);

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

  useEffect(() => {
    chatRef.current.scrollTo(0, 0);
    chatMessageRef.current.scrollTo({
      top: chatMessageRef.current.scrollHeight + 1,
      behavior: 'smooth',
    })
  }, [roomMessages])

  return (
    <div className="chat" ref={chatRef}>
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

      <div className="chat__message" ref={chatMessageRef}>
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

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  )
}

Chat.propTypes = {

}

export default Chat

