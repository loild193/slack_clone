import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CommentIcon from '@material-ui/icons/Comment';
import CreateIcon from '@material-ui/icons/Create';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InboxIcon from '@material-ui/icons/Inbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context/StateProvider';
import db from '../../firebase';
import SidebarDirectMessage from '../SidebarDirectMessage/SidebarDirectMessage';
import SidebarOption from '../SidebarOption/SidebarOption';
import './Sidebar.scss';

function Sidebar(props) {
  const [channels, setChannels] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection('teammates').onSnapshot(snapshot => {
      setTeammates(
        snapshot.docs.filter(doc => 
          doc.data().uid1 === user.uid || doc.data().uid2 === user.uid   
        )
        .map(doc => ({
          id: doc.id,
          uid1: doc.data().uid1,
          uid2: doc.data().uid2,
          username1: doc.data().username1,
          username2: doc.data().username2,
          userImage1: doc.data().userImage1,
          userImage2: doc.data().userImage2,
        }))
      )
    });
    
    return setTeammates([]);
  }, []);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        })))
    ));
      
    return setChannels([]);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Coders-Tokyo</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>

        <CreateIcon />
      </div>

      <SidebarOption Icon={CommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Save items" />
      <SidebarOption Icon={PermContactCalendarIcon} title="Contact" />
      <SidebarOption Icon={MoreVertIcon} title="More" />
      <hr />
      <SidebarOption Icon={ArrowRightIcon} title="Channels" />
      {
        channels.map(channel => 
        <SidebarOption
          key={channel.id}
          id={channel.id} 
          title={channel.name}
        />
        )
      }
      <SidebarOption addChannelOption Icon={AddIcon} title="Add new channel" />
      <div className="sidebar__messages">
        <SidebarOption Icon={ArrowRightIcon} title="Direct messeages" />
        {
          teammates.map(teammate => 
            <SidebarDirectMessage 
              key={teammate.id}
              id={teammate.id}
              uid1={teammate.uid1}
              uid2={teammate.uid2}
              userImage1={teammate.userImage1}
              userImage2={teammate.userImage2}
              username1={teammate.username1}
              username2={teammate.username2}
            />
          )
        }
        <SidebarDirectMessage addTeammate Icon={AddIcon} title="Add teammate" />
      </div>
    </div>
  )
}

Sidebar.propTypes = {

}

export default Sidebar

