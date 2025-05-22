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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useMessages, Message } from '../context/MessagesContext';
// Assuming you have a way to get the current logged-in user's ID
// For now, we'll use a placeholder. You'll need to replace this.
const CURRENT_USER_ID = 'user123'; // Replace with actual user ID logic

const UserChatScreen = () => {
  const navigation = useNavigation();
  const { messages, addMessage } = useMessages();
  const [message, setMessage] = useState('');

  // Filter messages to only show those sent by the current user to admin
  const userMessages = messages.filter(msg => msg.senderId === CURRENT_USER_ID && msg.receiverId === 'admin123');

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage(CURRENT_USER_ID, 'admin123', message.trim()); // Send message from user to admin
      setMessage('');
    } else {
      Alert.alert('Error', 'Please enter a message.');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, styles.userMessageBubble]}>
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.timestampText}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Adjusted offset for header
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.title}>Contact Support</Text> */}

          <FlatList
            data={userMessages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here..."
              multiline
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.sendButton}
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  timestampText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserChatScreen; 