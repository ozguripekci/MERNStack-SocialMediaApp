import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function Topbar() {
  const  {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className="topbarContainer">

        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
              <span className="logo">Ratify</span>
            </Link>
          <div className="searchbar">
            <Search className="searchIcon"/>
            <input placeholder="Search..." className="searchInput" />
          </div>
        </div>

        <div className="topbarCenter">
        </div>

        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              	<Person />
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              	<Chat />
                <span className="topbarIconBadge">3</span>
            </div>
            <div className="topbarIconItem">
              	<Notifications />
                <span className="topbarIconBadge">2</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF+user.profilePicture : PF+ "person/noAvatar.png"} alt="" className="topbarImg" />
          </Link>
          <span>{user.username}</span>
        </div>

    </div>
  )
}
