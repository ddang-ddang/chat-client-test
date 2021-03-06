import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';

let socket;
const ChatPage = () => {
    // const [user, setUser] = useState("");
    // const [room, setRoom] = useState("");
    // const [users, setUsers] = useState([]);
    // const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [chatRoomLst, setChatRoomLst] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const params = useParams();
    const socketUrl = 'http://localhost:8000'

    const { userId, nickname, roomId, roomName } = params

    useEffect(() => {
        const search = window.location.search;
        // const params = new URLSearchParams(search);

        socket = io(socketUrl);


        socket.emit('enterRoom', { userId, nickname, roomId, roomName }, (err) => {
            if (err) {
                // alert(err)
            }
        })

        return () => {
            // User leaves room
            socket.disconnect();

            socket.off()
        }

    }, [socketUrl,window.location.search])

    useEffect(() => {
        socket.on('getMessage', msg => {
            setChatHistory(prevMsg => [...prevMsg, msg])

            setTimeout(() => {

                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight - div.clientWidth;
            }, 10)
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
       
        socket.emit('sendMessage', message, () => setMessage(""))
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight ;
        }, 100)
    }

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
        <h3 className="text-center">????????????</h3>
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
                      {chatRoom} ?????? ?????????
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history chat" id="chat_body">
                {
                  chatHistory.map((chat) => {
                    return (
                      <div>
                      {/* {console.log('chat.userId', chat.userId)} */}
                      {/* {console.log('userId', userId)} */}
                      {Number(chat.userId) === Number(userId) ? (
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
                    <i className="fa fa-paper-plane-o" aria-hidden="true"> ?????????</i>
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
