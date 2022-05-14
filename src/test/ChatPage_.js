import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet } from "react-helmet";
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";


function ChatPage() {
  // const [currentSocket, setCurrentSocket] = useState();
  const [message, setMessage] = useState('');
  const [chatRoomLst, setChatRoomLst] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const socket = io.connect('http://localhost:8080')
  // let socket;
  const params = useParams()

  const { userId, nickname, roomId, roomName } = params

  socket.on('connect', () => {
    console.log('connected')
  })

  const enterRoom = () => {
    
  }

  const sendMessage = (e) => {
    e.preventDefault()
    let body = {
      message,
    }

    console.log(body);

    socket.emit('sendMessage', { userId, body, roomId, roomName })

    setMessage('')
  }


  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected");

      socket.emit('enterRoom', { userId, nickname, roomId, roomName }, (response) => {
        console.log(userId)
        console.log(response.messages)
        setChatHistory([...response.messages])
      });

      // socket.on('getMessages', (response) => {
      //   console.log('response', response)
      // })
    })
  }, [socket])

  return (
    <div>
      <Helmet>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <link href="/style.css" type="text/css" rel="stylesheet" />
        {/* <script
            src="https://cdn.socket.io/3.1.3/socket.io.min.js"
            integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
            crossorigin="anonymous"
        ></script> */}
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      </Helmet>
      <div className="container">
        <h3 className="text-center">니땅내땅</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Chat Room</h4>
                </div>
              </div>
              <div className="inbox_chat chatRoomList">
                {chatRoomLst.map((chatRoom) => {
                  return (
                    <div>
                      {chatRoom} 마을 채팅방
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history chat">
                {
                  chatHistory.map((chat) => {
                    return (
                      <div>
                      {chat.userId === Number(userId) ? (
                        <div style={{ color: 'red' }}>
                          {chat.message}
                        </div>
                      ) : (
                        <div style={{ color: 'blue' }}>
                          {chat.message}
                        </div>
                      )}
                    </div>
                    )
                  })
                }
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    value={message}
                    onChange={(event) => {setMessage(event.target.value)}}
                  />
                  <button onClick={sendMessage} className="msg_send_btn sendMessage" type="button">
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                  <button className="exit_btn exitRoom" type="button">
                    <i className="fa fa-paper-plane-o" aria-hidden="true"> 나가기</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
