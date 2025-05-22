import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useMessages, Message } from '../context/MessagesContext';
import { useTheme } from '../context/ThemeContext';

// Assuming you have a way to get the current logged-in admin's ID
// For now, we'll use a placeholder. You'll need to replace this.
const CURRENT_ADMIN_ID = 'admin123'; // Replace with actual admin ID logic

const AdminChatScreen = () => {
  const route = useRoute();
  const { userId } = route.params as { userId: string }; // Get the user ID from navigation params
  const { messages, addMessage, markAsRead } = useMessages();
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

  // Filter messages to only show the conversation between this admin and this user
  const conversationMessages = messages.filter(
    (msg) =>
      (msg.senderId === CURRENT_ADMIN_ID && msg.receiverId === userId) ||
      (msg.senderId === userId && msg.receiverId === CURRENT_ADMIN_ID)
  );

  // Effect to mark messages from the user as read when viewing the chat
  useEffect(() => {
    conversationMessages.forEach(msg => {
      if (msg.senderId === userId && !msg.isRead) {
        markAsRead(msg.id);
      }
    });
  }, [conversationMessages, userId, markAsRead]);

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage(CURRENT_ADMIN_ID, userId, message.trim());
      setMessage('');
    } else {
      Alert.alert('Error', 'Please enter a message.');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        screenStyles.messageBubble,
        item.senderId === CURRENT_ADMIN_ID
          ? screenStyles.adminMessageBubble
          : screenStyles.userMessageBubble,
      ]}
    >
      <Text style={item.senderId === CURRENT_ADMIN_ID ? screenStyles.adminMessageText : screenStyles.userMessageText}>{item.content}</Text>
      <Text style={item.senderId === CURRENT_ADMIN_ID ? screenStyles.adminTimestampText : screenStyles.userTimestampText}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  // Define styles based on the current theme
  const screenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    },
    chatTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 10,
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#ddd' : '#333',
      color: theme === 'light' ? '#333' : '#fff',
    },
    messageList: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    messageBubble: {
      padding: 10,
      borderRadius: 8,
      marginBottom: 5,
      maxWidth: '80%',
    },
    userMessageBubble: {
      backgroundColor: theme === 'light' ? '#e0e0e0' : '#333',
      alignSelf: 'flex-start',
    },
    adminMessageBubble: {
      backgroundColor: theme === 'light' ? '#007AFF' : '#0056b3',
      alignSelf: 'flex-end',
    },
    userMessageText: {
      fontSize: 16,
      color: theme === 'light' ? '#000' : '#fff',
    },
    adminMessageText: {
      fontSize: 16,
      color: '#fff',
    },
    userTimestampText: {
      fontSize: 10,
      color: theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      alignSelf: 'flex-end',
      marginTop: 2,
    },
    adminTimestampText: {
      fontSize: 10,
      color: 'rgba(255, 255, 255, 0.8)',
      alignSelf: 'flex-end',
      marginTop: 2,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
      borderTopWidth: 1,
      borderColor: theme === 'light' ? '#ddd' : '#333',
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: theme === 'light' ? '#eee' : '#333',
      borderRadius: 20,
      marginRight: 10,
      maxHeight: 100,
      color: theme === 'light' ? '#000' : '#fff',
    },
    sendButton: {
      backgroundColor: theme === 'light' ? '#007AFF' : '#0056b3',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={screenStyles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={screenStyles.chatTitle}>Chat with User: {userId}</Text>
          <FlatList
            data={conversationMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={screenStyles.messageList}
          />

          <View style={screenStyles.inputContainer}>
            <TextInput
              style={screenStyles.input}
              placeholder="Reply to user..."
              multiline
              value={message}
              onChangeText={setMessage}
              placeholderTextColor={theme === 'light' ? '#666' : '#aaa'}
            />
            <TouchableOpacity
              style={screenStyles.sendButton}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Ionicons name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Base styles (can be overridden by theme-specific styles)
});

export default AdminChatScreen; 