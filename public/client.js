//client file 
const socket=io()//for connect the socket
let name;
//until you not type the name it never go back
while(!name){
name=prompt('please enter your name')
}
let textarea=document.getElementById('textarea');
let messageArea=document.querySelector('.message_area');
var feedback=document.getElementById('feedback')

//listener event

textarea.addEventListener('keypress',()=>{
    socket.emit('typing',name)


})
textarea.addEventListener('keyup',(e)=>{

    if(e.key==="Enter")
{

   let msg=
    {
        user:name,
        msgs:e.target.value
    }
 

 appendMessage(msg,'outgoing')
 socket.emit('client-send',msg)
   e.target.value=""
     e.target.value.focus();

}
}
)
//defination the send message
/*function sendMessage(Message)
{
    
    appendMessage(msg,'outgoing')//calling the append message
    //send data to sever
    //socket.emit('event-name',{})
   

    socket.emit('client-send',msg)
     e.target.value=""
     e.target.value.focus();
}
*/
//defination the message
function appendMessage(msg,type)
{
    let mainDiv=document.createElement('div')
    
    let classname=type
    mainDiv.classList.add(classname,'message')
    let markup=`
    
  
  <h3 style="color:blue;">  ${msg.user}</h3>
    
        <br>
        <br>
        ${msg.msgs}
  
         `;
     mainDiv.innerHTML=markup
     messageArea.appendChild(mainDiv)
     
     document.getElementsByTagName('section')[0].scrollBy(0, 200);
   
}

socket.on('server-send',(msg)=>{
    document.getElementById('feedback').innerHTML=''
    appendMessage(msg,'incoming')
   
})  

socket.on('serve',(msg)=>{
    
document.getElementById('feedback').innerHTML=msg+' is typing'


})

//what create element and add innertext and html in it and append child in div