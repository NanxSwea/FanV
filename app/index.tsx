import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import Colors from '@/constants/Colors';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary[600]} />
      </View>
    );
  }

  // Redirect based on authentication status and user role
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.role === 'vendor') {
    return <Redirect href="/(vendor)/dashboard" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});