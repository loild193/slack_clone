import { InfoOutlined, PersonAdd, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import ChatInput from '../ChatInput/ChatInput';
import Message from '../Message/Message';
import './Chat.scss';
import PropTypes from 'prop-types';
import { useStateValue } from '../../context/StateProvider';

function Chat({ room }) {
  const [{ user }] = useStateValue();
  const { roomId, teammateId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);
  const [channelName, setChannelName] = useState("");

  const chatRef = useRef(null);
  const chatMessageRef = useRef(null);

  useEffect(() => {
    if (roomId || teammateId) {
      db.collection(room ? 'rooms' : 'teammates')
      .doc(room ? roomId : teammateId)
      .onSnapshot(snapshot => {
        setRoomDetails(snapshot.data())
        !room && (user.displayName === snapshot.data().username1 ?
        setChannelName({
          username: snapshot.data().username2,
          userImage: snapshot.data().userImage2,
        }) :
        setChannelName({
          username: snapshot.data().username1,
          userImage: snapshot.data().userImage1,
        }))
      })

      db.collection(room ? 'rooms' : 'teammates')
        .doc(room ? roomId : teammateId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => 
          setRoomMessages(snapshot.docs.map(doc => doc.data()))
        )
    } 
    return () => {
      setChannelName(null);
      setRoomDetails(null);
    }
  }, [roomId, teammateId, room, user]);

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
          <h4 className="chat__channel-name">
            { !room && <img className="sidebarOption__avatar" src={channelName?.userImage} alt="avatar" />}
            {
              room ? `#` + roomDetails?.name : channelName?.username
            }
          </h4>
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

      <ChatInput 
        channelName={room ? roomDetails?.name : channelName?.username} 
        channelId={room ? roomId : teammateId} 
        room={room}
      />
    </div>
  )
}

Chat.propTypes = {
  room: PropTypes.bool,
}
Chat.defaultProps = {
  room: false,
}

export default Chat

