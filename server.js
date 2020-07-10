const express=require('express');
const { Socket } = require('dgram');
const app=express()
//create server
//define port
const PORT=process.env.PORT || 3000

//homepage route
app.get('/',(req,res)=>{
 res.sendFile(__dirname+'/index.html')
})
//serve the static path app.use for middleware
app.use(express.static(__dirname+'/public'))

//listen port
var server=app.listen(PORT,()=>{
    console.log('server is running at port 3000')
})
//for knowing the socket which server we are using 
const io=require('socket.io')(server)

//if any client connect the server then it will run
io.on('connection',(socket)=>{

socket.on('client-send',(msg)=>{
socket.broadcast.emit('server-send',msg)

})
socket.on('typing',(typing)=>{
var name=typing;
//it broadcast to all other client but not at current client socket
socket.broadcast.emit('serve',name)

  })
})