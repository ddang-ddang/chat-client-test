import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  const [userId, setUserId] = useState(0)
  const [nickname, setNickname] = useState('')
  const [roomId, setRoomId] = useState(0)
  const [roomName, setRoomName] = useState('')

  const submitHandler = () => {

  }


  return (
    <div>
      <form>
        <div>
          <div>userId</div>
          <input 
            name='userId'
            onChange={(event) => {setUserId(event.target.value)}}
            placeholder='userId' />
          <div>nickname</div>
          <input
            name='nickname'
            onChange={(event) => {setNickname(event.target.value)}}
            placeholder='nickname' />
          <div>roomId</div>
          <input
            name='roomId'
            onChange={(event) => {setRoomId(event.target.value)}}
            placeholder='roomId' />
          <div>roomName</div>
          <input 
            name='roomName'
            onChange={(event) => {setRoomName(event.target.value)}}
            placeholder='roomName' />
            <Link to={`/chat/${userId}/${nickname}/${roomId}/${roomName}`}>sdfsdf</Link>
        </div>
      </form>
    </div>
  )
}

export default LandingPage