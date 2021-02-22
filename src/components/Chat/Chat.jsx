import React from 'react'
import PropTypes from 'prop-types'
import './Chat.scss'
import { useParams } from 'react-router-dom'
import { InfoOutlined, PersonAdd, StarBorderOutlined } from '@material-ui/icons';

function Chat(props) {
  const { roomId } = useParams();

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header__left">
          <h4 className="chat__channel-name">#general</h4>
          <StarBorderOutlined titleAccess="Star channel" />
        </div>

        <div className="chat__header__right">
          <PersonAdd titleAccess="Add people to #general" />
          <InfoOutlined titleAccess="Show channel details" />
        </div>
      </div>
    </div>
  )
}

Chat.propTypes = {

}

export default Chat

