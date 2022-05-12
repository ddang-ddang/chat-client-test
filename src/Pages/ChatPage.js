import React, { useEffect, useState } from "react";
import "./style.css";
import io, { connect } from 'socket.io-client';

const socket = io.connect('http://localhost:8080')

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatRoomLst, setChatRoomLst] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const userId = 3;
  const nickname = 'wooseok';
  const room = {
    roomId: 12,
    roomName: '봉천동',
  }

  const sendMessage = () => {
    let body = {
      message,
    }

    socket.emit('sendMessage', { userId, body, room }, (response) => {
      console.log(response);
      
    })

    setMessage('')
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected");

      
      socket.emit('enterRoom', { userId, nickname, room }, (response) => {
        // myInfo.nickname = response.nickname;
        // myInfo.id = socket.id;
        // myInfo.room = response.room;
        setChatRoomLst([ ...chatRoomLst, room.roomName ])
      });
      socket.emit('findAllMessages', { room }, (response) => {
        console.log('모든 메세지 가져오기')
        console.log(response)
      })
    //   socket.emit('findAllChats', null)
    })
  })

  return (
    <div>
      <div class="container">
        <h3 class="text-center">Messaging</h3>
        <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Chat Room</h4>
                </div>
                {/* <div class="chatroom_btn_place">
                </div> */}
              </div>
              <div class="inbox_chat chatRoomList">
                {chatRoomLst.map((chatRoom) => {
                  return (
                    <div>
                      {chatRoom} 마을 채팅방
                    </div>
                  )
                })}
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history chat"></div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input
                    type="text"
                    class="write_msg"
                    placeholder="Type a message"
                    value={message}
                    onChange={(event) => {setMessage(event.target.value)}}
                  />
                  <button onClick={sendMessage} class="msg_send_btn sendMessage" type="button">
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                  <button class="exit_btn exitRoom" type="button">
                    <i class="fa fa-paper-plane-o" aria-hidden="true"> 나가기</i>
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
