import "./message.css"

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://i.pinimg.com/564x/37/bb/02/37bb0218b92709ffbfbe488c96b3a888.jpg" alt="" />
            <p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p>
        </div>
        <div className="messageBottom">1 hour ago</div>

    </div>

    
  )
}
