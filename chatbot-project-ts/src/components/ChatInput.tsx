import React, { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '.././assets/loading-spinner.gif';
import dayjs from 'dayjs';
import './ChatInput.css';

type chatMessages = {
  id: string;
  message: string | React.JSX.Element;
  sender: string;
  time?: number | string;
}[];

type ChatInputProps = {
  chatMessages: chatMessages;
  setChatMessages: (chatMessages: chatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  function saveInputText(event: {
    target: {
      value: string;
    };
  }) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true)

    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessages}
        className='clear-button'
      >Clear</button>
    </div>
  );
}