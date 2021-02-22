import React from 'react'
import PropTypes from 'prop-types'
import './SidebarOption.scss'

function SidebarOption({Icon, title}) {
  return (
    <div className="sidebarOption">
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
}
SidebarOption.defaultProps = {
  Icon: null,
  title: "",
}

export default SidebarOption

