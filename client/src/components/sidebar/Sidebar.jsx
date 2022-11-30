import "./sidebar.css"
import {Stars, Chat, VideoLibrary, Group, Bookmarks, Help, Work, Event, Map, ExitToApp} from "@material-ui/icons"
import CloseFriend from "../closeFriend/CloseFriend"
import {Link} from "react-router-dom"


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Stars className="sidebarIcon"/>
            <span className="sidebarListItemText">Moment</span>
          </li>
          <li className="sidebarListItem">
            <Link to="/messenger" style={{textDecoration:"none"}}>
              <Chat className="sidebarIcon"/>
              <span className="sidebarListItemText">Messenger</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmarks className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <Map className="sidebarIcon"/>
            <span className="sidebarListItemText">Globe</span>
          </li>
          <li className="sidebarListItem">
            <Help className="sidebarIcon"/>
            <span className="sidebarListItemText">Help</span>
          </li>
          <li className="sidebarListItem">
            <ExitToApp className="sidebarIcon"/>
            <span className="sidebarListItemText">Logout</span>
          </li>

        </ul>
        <button className="sidebarButton">Ratify</button>
        <hr className="sidebarHr"/>
        <div className="loginLeft">
            <br /><br />
            <h className="rights">All rights reserved.</h>
            <p className="rights">Ratify © 2022  </p>
            <p className="rights">Özgür Ipekci</p>

        </div>
      </div>
    </div>
  )
}
