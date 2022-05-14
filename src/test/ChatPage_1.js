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
  const params = useParams()

  const { userId, nickname, roomId, roomName } = params

  const [socket, setSocket] = useState();


  // socket.on('getMessage', ({ id, nickname, roomId, message }) => {
  //   setChatHistory([
  //     ...chatHistory,
  //     {
  //       userId: id,
  //       nickname,
  //       roomId,
  //       message,
  //     }
  //   ])
  // })
  
  useEffect(() => {
    const socketIo = io("http://localhost:8080", {
      cors: { 
        origin: "http://localhost:8080", credentials: true
      },
      transports: ["websocket"],
      query: { tenant: 'EGU' }
    })

    socketIo.on('responseRoom', (data) => {
      console.log(data)
    }) 

    setSocket(socketIo)

    socketIo.emit('enterRoom', { userId, nickname, roomId, roomName }, (response) => {
      console.log(response)
      setChatHistory([...response.messages])
    })

    // socketIo.on('getMessage', ({ id, nickname, roomId, roomName }) => {
    //   console.log('id', id)
    //   console.log('id', nickname)
    //   console.log('id', roomId)
    //   console.log('id', roomName)
    // })
  }, [])
  
  useEffect(() => {
    return (() => {
      if (socket) { socket.disconnect(); }
    }) 

    
  }, [socket])
  
  const joinRoom = () => {
    socket.emit('refresh', { noticeNo: params?.noticeNo })
  }

  const sendMessage = () => {
    const body = {
      message
    }

    socket.emit('sendMessage', { userId, body, roomId, roomName })
    

    setChatHistory([
      ...chatHistory,
      {
        userId: Number(userId),
        nickname,
        roomId,
        message,
      }
    ])

    setMessage('')

  }


  useEffect(() => {
    socket.on('getMessage', ({ id, nickname, roomId, message }) => {
      setChatHistory([
        ...chatHistory,
        {
          userId: id,
          nickname,
          roomId,
          message,
        }
      ])
    })


    return () => {
      socket.off('getMessage');
    };
  });




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
