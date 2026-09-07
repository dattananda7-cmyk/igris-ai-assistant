import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { chatAPI } from '../api';
import {
  setCurrentConversation,
  setMessages,
  addMessage,
  setGenerating,
} from '../redux/slices/chatSlice';
import { colors, glassStyles } from '../theme/colors';

const ChatScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { conversationId } = route.params;
  const { currentConversation, messages, isGenerating } = useSelector((state) => state.chat);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  const loadConversation = async () => {
    setIsLoading(true);
    try {
      const response = await chatAPI.getConversation(conversationId);
      dispatch(setCurrentConversation(response.data.data));

      // Load messages
      const messagesResponse = await chatAPI.getMessages(conversationId);
      dispatch(setMessages(messagesResponse.data.data.messages));
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || isGenerating) return;

    const userMessage = messageText;
    setMessageText('');
    setIsSending(true);
    dispatch(setGenerating(true));

    try {
      const response = await chatAPI.sendMessage(
        conversationId,
        userMessage,
        'text'
      );

      const { userMessage: user, assistantMessage: assistant } = response.data.data;
      dispatch(addMessage(user));
      dispatch(addMessage(assistant));
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error to user
    } finally {
      setIsSending(false);
      dispatch(setGenerating(false));
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.aiText,
          ]}
        >
          {item.content}
        </Text>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {currentConversation?.title}
          </Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.messagesList}
          scrollEnabled={true}
        />

        {isGenerating && (
          <View style={styles.generatingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.generatingText}>IGRIS is thinking...</Text>
          </View>
        )}

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor={colors.textTertiary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxHeight={120}
            editable={!isGenerating && !isSending}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (isGenerating || isSending || !messageText.trim()) &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={isGenerating || isSending || !messageText.trim()}
          >
            <Text style={styles.sendButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    marginVertical: 8,
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    ...glassStyles.glassContainer,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  userText: {
    color: colors.background,
  },
  aiText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
  },
  generatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  generatingText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    ...glassStyles.glassContainer,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatScreen;
