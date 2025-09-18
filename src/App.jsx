import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import RobotImg from '.././src/assets/robot.png';
import './App.css'

function App() {

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  //const {ChatMessages, setChatMessages} = array;

  //const ChatMessages = array[0];
  //const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
      'hi': 'Hi! How can I help you?'
    });
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const num = chatMessages.length;

  const title = `${num} Messages`;

  return (
    <>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={RobotImg} />

      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )}
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App
