import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch ,useSelector} from 'react-redux';
import {getAllUsers} from '../../redux/slices/userSlice/getAllUsers'
const socket = io('http://localhost:5000'); // Backend URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [user, setuser] = useState('');
  const [messages, setMessages] = useState([]);
  const [myid,  setmyid] = useState([]);

  const dispatch=useDispatch()
  const {
    dataAllUsers ,
    StatusAllUser,
    errorStatusAllUsers,
  }=useSelector((state)=> state.GetAllUserDataSlice)



  

  useEffect(() => {

   
    socket.on('private_message', ({ from, message }) => {
      setMessages((prevMessages) => [...prevMessages, { from, message }]);
      console.log('New private message:', { from, message });
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);


  const register=()=>{
    socket.emit('register', myid);
  }

  useEffect(()=>{
    dispatch(getAllUsers('/api/users'))
  },[])
  

  
  const handleSendMessage = () => {
    
    if (message.trim()) {
      socket.emit('private_message', {  
        to: user,
        from: myid,
        message, });
      setMessage('');
    }
  };

  console.log(dataAllUsers)
  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.id}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
     <div>

     <input
          type="text"
          
          onChange={(e) => setuser(e.target.value)}
          placeholder="user"
        />
          <input
          type="text"
         
          onChange={(e) => setmyid(e.target.value)}
          placeholder="register"
        />
     </div>
<button onClick={()=>register()}>register</button>

    </div>
  );
};

export default Chat;
