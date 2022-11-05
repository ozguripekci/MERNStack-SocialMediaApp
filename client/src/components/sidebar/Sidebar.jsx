import "./sidebar.css"
import {Stars, Chat, VideoLibrary, Group, Bookmarks, Help, Work, Event, School, Map} from "@material-ui/icons"
import CloseFriend from "../closeFriend/CloseFriend"
import { Users } from "../../dummyData"
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
            <VideoLibrary className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
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
            <Help className="sidebarIcon"/>
            <span className="sidebarListItemText">Help</span>
          </li>
          <li className="sidebarListItem">
            <Work className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon"/>
            <span className="sidebarListItemText">School</span>
          </li>
          <li className="sidebarListItem">
            <Map className="sidebarIcon"/>
            <span className="sidebarListItemText">Globe</span>
          </li>

        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
            {Users.map(u => (
              <CloseFriend key={u.id} user={u} />
            ))}      
        </ul>
      </div>
    </div>
  )
}
