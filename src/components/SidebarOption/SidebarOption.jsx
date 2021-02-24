import React from 'react'
import PropTypes from 'prop-types'
import './SidebarOption.scss'
import { useHistory } from 'react-router-dom';
import db from '../../firebase';

function SidebarOption({Icon, title, addChannelOption, id}) {
  const history = useHistory();
  
  const addChannel = () => {
    const channelName = prompt('Please enter the channel name: ');

    channelName && 
      db.collection('rooms').add({
        name: channelName,
      })
  }
  const selectChannel = () => {
    id ? history.push(`/room/${id}`) : history.push(title);
  }

  return (
    <div 
      className="sidebarOption"
      onClick={addChannelOption ? addChannel :selectChannel}
    >
      { Icon && <Icon className="sidebarOption__icon" />}
      { 
        Icon ? 
        <h3>{title}</h3> : 
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {title}
        </h3>  
      }
    </div>
  )
}

SidebarOption.propTypes = {
  Icon: PropTypes.any,
  title: PropTypes.string,
  addChannelOption: PropTypes.bool,
  id: PropTypes.string,
}
SidebarOption.defaultProps = {
  Icon: null,
  title: "",
  addChannelOption: false,
  id: null,
}

export default SidebarOption

