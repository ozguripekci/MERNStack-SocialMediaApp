import "./message.css"
import {format} from "timeago.js"

export default function Message({message,own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://i.pinimg.com/564x/37/bb/02/37bb0218b92709ffbfbe488c96b3a888.jpg" alt="" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>

    </div>

    
  )
}
