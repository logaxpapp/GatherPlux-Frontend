"use client";
import React, { useState } from "react";

// Define the message type
type Message = {
  id: number;
  sender: string;
  time: string;
  content: string;
  read: boolean;
};

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Jane Doe",
      time: "Wed 10:15am",
      content: "Here is another message to show how ...",
      read: false,
    },
    {
      id: 2,
      sender: "John Doe",
      time: "Wed 10:15am",
      content: "Don't forget to check the new updates!",
      read: false,
    },
    {
      id: 3,
      sender: "John Doe",
      time: "Wed 10:15am",
      content: "Don't forget to check the new updates!",
      read: false,
    },
    {
      id: 4,
      sender: "John Doe",
      time: "Wed 10:15am",
      content: "Don't forget to check the new updates!",
      read: false,
    },
  ]);

  // Mark a message as read
  const markAsRead = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
    );
  };

  // Delete a message
  const deleteMessage = (id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="flex h-screen">
      <div className="w-full mx-auto flex h-full">
        <main className="flex-1 p-10 bg-[#020e1e] pr-10">
          {!selectedMessage ? (
            <MessageList
              messages={messages}
              onMessageClick={setSelectedMessage}
              onMarkAsRead={markAsRead}
              onDelete={deleteMessage}
            />
          ) : (
            <MessageDetail
              message={selectedMessage}
              onBack={() => setSelectedMessage(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

const truncateContent = (content: string, wordLimit: number = 4) => {
  const words = content.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : content;
};

// Message List Component
type MessageListProps = {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onMessageClick,
  onMarkAsRead,
  onDelete,
}) => (
  <section className="border border-[#243447] rounded-lg">
    <div className="flex justify-between items-center pt-5 pb-3 px-4">
      <h2 className="text-xl font-bold">Messages</h2>
      <span className="text-sm text-[#93d437]">{messages.length} new</span>
    </div>
    <div className="border-t border-[#243447] rounded-b p-5">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onClick={() => onMessageClick(message)}
          onMarkAsRead={() => onMarkAsRead(message.id)}
          onDelete={() => onDelete(message.id)}
        />
      ))}
      <div className="flex justify-between items-center pt-4">
        <button className="text-[#93d437]">← Previous</button>
        <div className="flex space-x-1">
          {Array.from({ length: 10 }, (_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded ${
                index === 0 ? "bg-[#93d437] text-purple-600" : "text-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="text-[#93d437]">Next →</button>
      </div>
    </div>
  </section>
);

// Message Item Component
type MessageItemProps = {
  message: Message;
  onClick: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onClick,
  onMarkAsRead,
  onDelete,
}) => (
  <div className="flex justify-between items-center py-3 border-b border-[#243447] cursor-pointer">
    <div className="flex items-start space-x-4 flex-1" onClick={onClick}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600">
        UE
      </div>
      <div>
        <h3 className="font-bold">{message.sender}</h3>
        <p className="text-sm text-gray-500">
          {truncateContent(message.content)}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <button
        className={`text-xs px-3 py-1 rounded ${
          message.read ? "bg-gray-300" : "bg-[#93d437] text-blue-950"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onMarkAsRead();
        }}
      >
        {message.read ? "Read" : "Mark as Read"}
      </button>
      <button
        className="text-red-500 text-xs px-3 py-1 rounded bg-red-200"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </button>
      <div className="text-gray-500">{message.time}</div>
    </div>
  </div>
);

// Message Detail Component
type MessageDetailProps = {
  message: Message;
  onBack: () => void;
};

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onBack }) => (
  <div className="bg-white p-5 rounded-lg shadow-lg">
    <button className="text-blue-500 mb-4" onClick={onBack}>
      ← Back to messages
    </button>
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#243447] text-gray-600">
        UE
      </div>
      <div>
        <h3 className="font-bold text-lg">{message.sender}</h3>
        <p className="text-gray-500 text-sm">{message.time}</p>
      </div>
    </div>
    <div className="bg-blue-100 p-4 rounded-md text-gray-700">
      {message.content}
    </div>
    <div className="flex justify-end mt-4">
      <button className="text-red-500 text-xs px-3 py-1 rounded bg-[#93d437]">
        Delete
      </button>
    </div>
    <div className="mt-6">
      <textarea
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-950"
        placeholder="Reply your message..."
      />
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  </div>
);

export default Messages;
