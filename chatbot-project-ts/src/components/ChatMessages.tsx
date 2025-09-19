import { useRef, useEffect } from "react";
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css';

type ChatMessagesProps = {
  chatMessages: {
    id: string;
    message: string;
    sender: string;
    time: string;
  }[];
};

function ChatMessages({chatMessages}: ChatMessagesProps) {
  function useAutoScroll(dependencies: object[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.
      scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
  }

  const chatMessagesRef = useAutoScroll(chatMessages);

  return(
    <div 
    className="chat-messages-container"
      ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;