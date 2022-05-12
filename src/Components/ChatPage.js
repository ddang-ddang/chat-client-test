import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet } from "react-helmet";
import io, { connect } from 'socket.io-client';
import { useParams } from "react-router-dom";


function ChatPage() {
  const [currentSocket, setCurrentSocket] = useState();
  const [message, setMessage] = useState('');
  const [chatRoomLst, setChatRoomLst] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  let socket;
  const params = useParams()

  const { userId, nickname, roomId, roomName } = params

  const sendMessage = () => {
    let body = {
      message,
    }

    socket.emit('sendMessage', { userId, body, roomId, roomName }, (response) => {
      console.log(response);
      
    })

    setMessage('')
  }

  useEffect(() => {
    // console.log(params)
    socket = io.connect('http://localhost:8080')
    socket.on('connect', () => {
      console.log("connected");

      socket.emit('enterRoom', { userId, nickname, roomId, roomName }, (response) => {
        // myInfo.nickname = response.nickname;
        // myInfo.id = socket.id;
        // myInfo.room = response.room;
        // setChatRoomLst([ ...chatRoomLst, room.roomName ])
        console.log(response)
      });
      socket.emit('findAllMessages', { roomId }, (response) => {
        console.log('모든 메세지 가져오기')
        console.log(response)
      })
      socket.emit('findAllChats', null)
    })
  })

  return (
    <div>
      <Helmet>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <link href="/style.css" type="text/css" rel="stylesheet" />
        <script
            src="https://cdn.socket.io/3.1.3/socket.io.min.js"
            integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
            crossorigin="anonymous"
        ></script>
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
              <div className="msg_history chat"></div>
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
