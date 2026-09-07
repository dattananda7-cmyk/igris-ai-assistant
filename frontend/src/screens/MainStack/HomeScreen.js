import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { chatAPI } from '../api';
import {
  setConversations,
  addConversation,
  setCurrentConversation,
} from '../redux/slices/chatSlice';
import { colors, glassStyles } from '../theme/colors';
import { typography } from '../theme/typography';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, isLoading } = useSelector((state) => state.chat);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await chatAPI.getConversations(1, 10);
      dispatch(setConversations(response.data.data.conversations));
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const handleNewChat = async () => {
    setIsCreating(true);
    try {
      const response = await chatAPI.createConversation('New Conversation', 'normal');
      const newConversation = response.data.data;
      dispatch(addConversation(newConversation));
      dispatch(setCurrentConversation(newConversation));
      navigation.navigate('Chat', { conversationId: newConversation._id });
    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectConversation = (conversation) => {
    dispatch(setCurrentConversation(conversation));
    navigation.navigate('Chat', { conversationId: conversation._id });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, Boss.</Text>
          <Text style={styles.subtitle}>What can IGRIS help you with today?</Text>
        </View>

        {/* New Chat Button */}
        <TouchableOpacity
          style={styles.newChatButton}
          onPress={handleNewChat}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <>
              <Text style={styles.newChatButtonIcon}>💬</Text>
              <Text style={styles.newChatButtonText}>Start New Chat</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <QuickActionButton icon="📚" label="Learn" onPress={() => handleNewChat()} />
            <QuickActionButton icon="💡" label="Create" onPress={() => handleNewChat()} />
            <QuickActionButton icon="💻" label="Code" onPress={() => handleNewChat()} />
            <QuickActionButton icon="🔍" label="Research" onPress={() => handleNewChat()} />
          </View>
        </View>

        {/* Recent Conversations */}
        {conversations.length > 0 && (
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>Recent Conversations</Text>
            {conversations.map((conversation) => (
              <TouchableOpacity
                key={conversation._id}
                style={styles.conversationCard}
                onPress={() => handleSelectConversation(conversation)}
              >
                <Text style={styles.conversationTitle} numberOfLines={1}>
                  {conversation.title}
                </Text>
                <Text style={styles.conversationTime}>
                  {new Date(conversation.updatedAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const QuickActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionIcon}>{icon}</Text>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  newChatButton: {
    ...glassStyles.glassContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 32,
    backgroundColor: 'rgba(0, 217, 255, 0.15)',
    borderColor: 'rgba(0, 217, 255, 0.4)',
  },
  newChatButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  newChatButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    ...glassStyles.glassContainer,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentContainer: {
    marginTop: 16,
  },
  conversationCard: {
    ...glassStyles.glassContainer,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  conversationTime: {
    color: colors.textTertiary,
    fontSize: 12,
    marginLeft: 8,
  },
});

export default HomeScreen;
