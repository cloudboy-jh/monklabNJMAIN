"use client";

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import SimpleSheet from './simple-sheet';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simplified model parameters
  const [modelTemperature, setModelTemperature] = useState<number>(0.7);
  const [modelChoice, setModelChoice] = useState<string>("gpt-4");
  const [maxTokens, setMaxTokens] = useState<number>(150);

  const SYSTEM_MESSAGE = {
    role: "system",
    content: "You are an AI assistant for MonkLab, a web app that helps users build software projects. Provide expert guidance on tech stacks, including front-end, back-end, databases, and deployment. Offer concise, practical advice on coding best practices and tools, tailored to the user's needs. Keep a professional, supportive, and informative tone."
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '' || isLoading) return;

    const newMessage: Message = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const allMessages = [
        SYSTEM_MESSAGE,
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: "user", content: inputMessage }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: modelChoice,
          messages: allMessages,
          temperature: modelTemperature,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const botResponse: Message = {
        text: response.data.choices[0].message.content,
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestartChat = () => {
    setMessages([]);
    setInputMessage('');
    setError(null);
  };

  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      chatMessagesRef.current?.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // Function to render code if the bot generates it
  const renderCodeBlock = (code: string) => {
    return (
      <pre className="bg-gray-900 text-gray-200 font-mono p-3 rounded-md whitespace-pre-wrap word-break break-words mt-1">
        <code>{code}</code>
      </pre>
    );
  };

  return (
    <div className="flex flex-col flex-1 max-h-[800px] min-h-[800px] bg-zinc-800 p-4 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg">
      <SimpleSheet 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
        onRestartChat={handleRestartChat}
      />
      <div className="flex-1 overflow-y-auto p-4 pb-[70px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-3 rounded-lg break-words ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
              {message.text.startsWith('```') ? renderCodeBlock(message.text.replace(/```/g, '')) : message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-black">
              Typing...
            </div>
          </div>
        )}
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-zinc-900 rounded-full overflow-hidden shadow-md">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Message MonkLab"
          disabled={isLoading}
          className="flex-grow bg-transparent border-none text-white p-3 text-base outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading || inputMessage.trim() === ''}
          className="bg-transparent text-red-500 border-none px-4 text-2xl cursor-pointer hover:bg-white/[.1] disabled:bg-transparent disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : '↑'}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
