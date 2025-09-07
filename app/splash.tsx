import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Navigate to tabs after 2 seconds
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (shouldRedirect) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.content}>
        <Text style={styles.title}>Komal Agencies</Text>
        <Text style={styles.subtitle}>Order Management System</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 40,
    textAlign: 'center',
  }
});
