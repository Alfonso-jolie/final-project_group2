import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Message = {
  id: string;
  senderId: string; // ID of the sender (user or admin)
  receiverId: string; // ID of the receiver (user or admin)
  content: string;
  timestamp: number;
  isRead: boolean; // Could be read by admin or user depending on context
};

type MessagesContextType = {
  messages: Message[];
  addMessage: (
    senderId: string,
    receiverId: string,
    content: string,
  ) => void;
  markAsRead: (messageId: string) => void;
  clearMessages: () => void;
};

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const addMessage = (
    senderId: string,
    receiverId: string,
    content: string,
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId,
      receiverId,
      content,
      timestamp: Date.now(),
      isRead: false, // Mark as unread for the recipient
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(message =>
      message.id === messageId ? { ...message, isRead: true } : message
    );
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
  };

  const clearMessages = () => {
    setMessages([]);
    saveMessages([]);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, markAsRead, clearMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}; 