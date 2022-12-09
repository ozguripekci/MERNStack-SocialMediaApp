import "./sidebar.css"
import {Stars, Chat, Group, Bookmarks, Help, Event, Map, ExitToApp} from "@material-ui/icons"
//import CloseFriend from "../closeFriend/CloseFriend"
import {Link} from "react-router-dom"
import { useState, useEffect } from "react";


export default function Sidebar() {
  const myStorage = window.localStorage;
  const [user, setUser] = useState(myStorage.getItem("user"));

  
    const handleLogout = () => {
      setUser(null);
      myStorage.removeItem("user");
      window.location.reload()
    };
 

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
            <Link to="/map" style={{textDecoration:"none"}}>
              <Map className="sidebarIcon"/>
              <span className="sidebarListItemText">Globe</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Help className="sidebarIcon"/>
            <span className="sidebarListItemText">Help</span>
          </li>
          <li className="sidebarListItem" >
            
              <ExitToApp className="sidebarIcon"/>
              <span className="sidebarListItemText" onClick={handleLogout}>Logout</span>
            
          </li>

        </ul>
        <button className="sidebarButton">Ratify</button>
        {/* <hr className="sidebarHr"/> */}
        <div className="loginLeft">
            <br /><br /><br /><br /><br />
            <h className="rights">All rights reserved!</h>
            <p className="rights">Ratify © 2022  </p>
            <p className="rights">Özgür Ipekci</p>

        </div>
      </div>
    </div>
  )
}
