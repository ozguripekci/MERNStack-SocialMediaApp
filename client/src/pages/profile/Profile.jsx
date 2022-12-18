import "./profile.css";
import { makeStyles } from "@material-ui/core/styles";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import StarRating from "../../components/rating/rating"

//! MUi for styles
const useStyles = makeStyles({
  rating: {
    padding: "20px",
    fontFamily: "Tohama",
    color: "#046582",
    textAlign: "center",
  },
})



export default function Profile() {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                  }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}
                <img className="verifyImg" src={PF + "verify.png"} alt="Ratified User" title="Ratified User ✅"/>
              </h4>

              <span className="profileInfoDesc">{user.desc}</span>
            </div>
            <div className={classes.rating}>
              <StarRating />  
            </div>

          </div>
          <div className="profileRightBottom">
          </div>
            <Feed username={username}/>
        </div>
            <Rightbar user={user} />
      </div>
    </>
  );
}