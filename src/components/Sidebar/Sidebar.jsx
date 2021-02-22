import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Sidebar.scss'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from '../SidebarOption/SidebarOption';
import CommentIcon from '@material-ui/icons/Comment';
import InboxIcon from '@material-ui/icons/Inbox';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import db from '../../firebase';

function Sidebar(props) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        })))
    ));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Coders-Tokyo</h2>
          <h3>
            <FiberManualRecordIcon />
            Le Duc Loi
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
          title={channel.name}
        />
        )
      }
      <SidebarOption Icon={AddIcon} title="Add new channel" />
      <hr />
      <SidebarOption Icon={ArrowRightIcon} title="Direct messeages" />
      <SidebarOption Icon={AddIcon} title="Add new teammate" />
    </div>
  )
}

Sidebar.propTypes = {

}

export default Sidebar

