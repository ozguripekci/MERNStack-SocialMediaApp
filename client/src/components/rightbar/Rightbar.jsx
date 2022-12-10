import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import SettingsIcon from '@mui/icons-material/Settings';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {

      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);

  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt=""/>
          <span className="birthdayText">
            <b>Mike Michael</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <a href="https://github.com/ozguripekci" target="_blank" rel="noreferrer noopener">
          <img className="rightbarAd" src="assets/ad.png" alt=""/>
        </a>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username !== currentUser.username && (
          <div>
              <Link
                to={"/messenger/" + friends.username}
                style={{ textDecoration: "none" }}
              >
              <button className="rightbarFollowButton">
                Send Message <span><EmailOutlinedIcon/></span>
              </button>
                
              </Link>
          </div>
        )}
        {user.username !== currentUser.username && (
          <div>
              <Link
                to={"/map/" + friends.location}
                style={{ textDecoration: "none" }}
              >
              <button className="rightbarFollowButton">
                See Location <span><PersonPinCircleIcon/></span>
              </button>
                
              </Link>
          </div>
        )} 
        {user.username === currentUser.username && (
          <div>
              <Link
                to={"/profile/" + currentUser.username}
                style={{ textDecoration: "none" }}
              >
              <button className="rightbarFollowButton">
                Edit Profile <span><SettingsIcon/></span>
              </button>
                
              </Link>
          </div>
        )} 

          <br />

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
            to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <html>

          {/* Calismiyor su anda Buy me coffee */}
            <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="ratify" data-description="Support me on Buy me a coffee!" data-message="Thank you for you support to our Ratify Team! Lets develop together..." data-color="#BD5FFF" data-position="Right" data-x_margin="18" data-y_margin="18" crossorigin></script>
        </html>
        <div >

          <br /><br /><br /><br />
          <h className="rightsRight"><span>Terms of Services  |  </span> About us! | <span> Team </span>  |  <span> Contact us! </span> </h>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}