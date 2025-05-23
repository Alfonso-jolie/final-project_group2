import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMessages } from '../context/MessagesContext';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../context/MessagesContext';
import { RootStackParamList } from '../App';
import { useTheme } from '../context/ThemeContext';

type AdminMessagesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>; // Type for the navigation prop

const AdminMessagesScreen = () => {
  const navigation = useNavigation<AdminMessagesNavigationProp>();
  const { messages, markAsRead } = useMessages();
  const [refreshing, setRefreshing] = React.useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Group messages by user to display conversations
  const conversations = messages.reduce((acc, message) => {
    const userId = message.senderId === 'admin123' ? message.receiverId : message.senderId; // Assuming admin ID is 'admin123'
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const conversationList = Object.keys(conversations).map(userId => ({
    userId,
    lastMessage: conversations[userId][conversations[userId].length - 1],
    unreadCount: conversations[userId].filter(msg => !msg.isRead && msg.senderId !== 'admin123').length, // Count unread messages from user
  }));

  // Sort conversations by the timestamp of the last message
  conversationList.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - In a real app, you would refetch messages here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderConversationItem = ({ item }: { item: { userId: string; lastMessage: Message; unreadCount: number } }) => (
    <TouchableOpacity
      style={[styles.conversationItem, isDark && styles.conversationItemDark]}
      onPress={() => navigation.navigate('AdminChat', { userId: item.userId })}
    >
      <View style={styles.conversationContent}>
        <Text style={[styles.conversationUser, isDark && styles.conversationUserDark]}>User: {item.userId}</Text>
        <Text
          style={[
            styles.lastMessageText,
            item.unreadCount > 0 && styles.unreadLastMessageText,
            isDark && styles.lastMessageTextDark,
            item.unreadCount > 0 && isDark && styles.unreadLastMessageTextDark,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.lastMessage.content}
        </Text>
      </View>
      <View style={styles.conversationInfo}>
        <Text style={[styles.timestamp, isDark && styles.timestampDark]}>
          {new Date(item.lastMessage.timestamp).toLocaleDateString()} {new Date(item.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {item.unreadCount > 0 && (
          <View style={[styles.unreadBadge, isDark && styles.unreadBadgeDark]}>
            <Text style={[styles.unreadBadgeText, isDark && styles.unreadBadgeTextDark]}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Messages</Text>
      <FlatList
        data={conversationList}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={48} color={isDark ? '#666' : '#ccc'} />
            <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No messages yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleDark: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderBottomColor: '#333',
  },
  listContainer: {
    padding: 16,
  },
  conversationItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationItemDark: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#fff',
    shadowOpacity: 0.2,
  },
  conversationContent: {
    flex: 1,
    marginRight: 10,
  },
  conversationUser: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  conversationUserDark: {
    color: '#fff',
  },
  lastMessageText: {
    fontSize: 14,
    color: '#666',
  },
  lastMessageTextDark: {
    color: '#ccc',
  },
  unreadLastMessageText: {
    fontWeight: 'bold',
    color: '#000',
  },
  unreadLastMessageTextDark: {
    fontWeight: 'bold',
    color: '#fff',
  },
  conversationInfo: {
    alignItems: 'flex-end',
  },
  timestamp: {
    color: '#666',
    fontSize: 10,
    marginBottom: 4,
  },
  timestampDark: {
    color: '#999',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadBadgeDark: {
    backgroundColor: '#0056b3',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  unreadBadgeTextDark: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyTextDark: {
    color: '#999',
  },
});

export default AdminMessagesScreen; 