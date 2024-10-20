"use client";

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import SimpleSheet from './simple-sheet';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import arrowBlack from '@/assets/arrowblack.png';
import arrowWhite from '@/assets/arrowwhite.png';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

interface ChatBoxProps {
  shouldRestartChat?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ shouldRestartChat }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [modelTemperature, setModelTemperature] = useState<number>(0.7);
  const [modelChoice, setModelChoice] = useState<string>('gpt-4o-mini');
  const [maxTokens, setMaxTokens] = useState<number>(1500);

  const SYSTEM_MESSAGE = {
    role: "system",
    content: "You are an AI assistant for MonkLab, a web app that helps users build software projects. Provide expert guidance on tech stacks, including front-end, back-end, databases, and deployment. Offer concise, practical advice on coding best practices and tools, tailored to the user's needs. Keep a professional, supportive, and informative tone."
  };

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleInitialPrompt = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    setIsChatStarted(true);
    handleSendMessage(e);
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

      const response = await axios.post('/api/chat', {
        messages: allMessages,
        max_tokens: maxTokens
      });

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
    setIsChatStarted(false);
  };

  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (theme === 'system') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      chatMessagesRef.current?.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch('/api/config');
      const config = await response.json();
      setModelTemperature(config.modelTemperature);
      setModelChoice(config.modelChoice);
      SYSTEM_MESSAGE.content = config.systemPrompt;
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (shouldRestartChat) {
      handleRestartChat();
    }
  }, [shouldRestartChat]);

  const renderFormattedMessage = (message: string) => {
    return (
      <ReactMarkdown
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          p: ({ children }) => <p className="mb-2">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
        }}
      >
        {message}
      </ReactMarkdown>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full pb-40 w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="relative mb-8 w-full">
        <h1 className="text-2xl font-bold relative overflow-hidden text-center">
          <span className="shine-text">Let's Ship Your Product</span>
          <div className="light-sweep absolute inset-0"></div>
        </h1>
      </div>
      
      <form onSubmit={isChatStarted ? handleSendMessage : handleInitialPrompt} 
            className={`flex items-center p-4 rounded-full overflow-hidden mb-8 w-full ${
              theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100'
            }`}>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder={isChatStarted ? "Message MonkLab" : "Ship your idea..."}
          className={`flex-grow bg-transparent border-none p-2 text-base outline-none font-bold ${
            theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={isLoading || inputMessage.trim() === ''}
          className={`bg-transparent border-none px-4 cursor-pointer disabled:opacity-50 ${
            theme === 'dark' ? 'hover:bg-white/[.1]' : 'hover:bg-gray-200'
          }`}
        >
          <img 
            src={theme === 'dark' ? arrowWhite.src : arrowBlack.src} 
            alt="Send" 
            className="w-6 h-6"
          />
        </button>
      </form>

      {isChatStarted && (
        <>
          <SimpleSheet 
            isOpen={isSheetOpen} 
            onOpenChange={setIsSheetOpen} 
            onRestartChat={handleRestartChat}
          />
          <div className="flex-1 w-full overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[90%] sm:max-w-[70%] p-3 rounded-lg break-words ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-200 text-black'
                }`}>
                  {message.sender === 'bot' 
                    ? renderFormattedMessage(message.text)
                    : message.text
                  }
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className={`max-w-[90%] sm:max-w-[70%] p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
                }`}>
                  Typing...
                </div>
              </div>
            )}
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
