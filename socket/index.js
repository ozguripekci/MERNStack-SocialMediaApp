const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    },
});


let users = []

const addUser = (userId, socketId) =>{
    !users.some((user)=>user.userId === userId) && users.push({userId, socketId})
}


const removeUser = (socketId) =>{
    users = users.filter((user)=>user.socketId  !== socketId)
} 

io.on("connection", (socket) => {
    // when connect
    console.log("a user connected.")
    // to send message all connected users
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    });

    // when disconnect
    socket.on("disconnect", ()=>{
        console.log("a user disconnected");
        removeUser(socket.id)
        io.emit("getUsers", users)

    })
})
