import "./chatOnline.css"

export default function ChatOnline() {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src="https://i.pinimg.com/564x/37/bb/02/37bb0218b92709ffbfbe488c96b3a888.jpg" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Arthur Morgan</span>
        </div>
    </div>
  )
}
