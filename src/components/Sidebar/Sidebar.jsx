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
import SidebarOption from '../SidebarOption/SidebarOption';
import './Sidebar.scss';

function Sidebar(props) {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        })))
    ));
    return setChannels([])
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
      <hr />
      <SidebarOption Icon={ArrowRightIcon} title="Direct messeages" />
      <SidebarOption Icon={AddIcon} title="Add new teammate" />
    </div>
  )
}

Sidebar.propTypes = {

}

export default Sidebar

