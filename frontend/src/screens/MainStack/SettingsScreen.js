import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/slices/authSlice';
import {
  setTheme,
  setLanguage,
  setVoiceEnabled,
  setMemoryEnabled,
  setNotificationsEnabled,
} from '../redux/slices/settingsSlice';
import { colors, glassStyles } from '../theme/colors';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const settings = useSelector((state) => state.settings);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  };

  const handleToggleSetting = (setting, value) => {
    switch (setting) {
      case 'voice':
        dispatch(setVoiceEnabled(value));
        break;
      case 'memory':
        dispatch(setMemoryEnabled(value));
        break;
      case 'notifications':
        dispatch(setNotificationsEnabled(value));
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileName}>
                {user?.profile?.preferredName || user?.username}
              </Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Voice Input/Output</Text>
              <Text style={styles.settingDesc}>Enable voice interactions</Text>
            </View>
            <Switch
              value={settings.voiceEnabled}
              onValueChange={(value) => handleToggleSetting('voice', value)}
              trackColor={{ false: colors.disabled, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>IGRIS Memory</Text>
              <Text style={styles.settingDesc}>Remember preferences & goals</Text>
            </View>
            <Switch
              value={settings.memoryEnabled}
              onValueChange={(value) => handleToggleSetting('memory', value)}
              trackColor={{ false: colors.disabled, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDesc}>Reminders and updates</Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => handleToggleSetting('notifications', value)}
              trackColor={{ false: colors.disabled, true: colors.primary }}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>IGRIS Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2024.1</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileCard: {
    ...glassStyles.glassContainer,
  },
  profileHeader: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 217, 255, 0.15)',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingRow: {
    ...glassStyles.glassContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 4,
  },
  infoRow: {
    ...glassStyles.glassContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  infoValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 56, 96, 0.15)',
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
