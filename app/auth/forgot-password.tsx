import { forgotPassword } from "@/src/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: () => forgotPassword(email),
    onSuccess: () => {
      router.push({
        pathname: "/auth/verify-otp",
        params: { email },
      });
    },
    onError: () => {
      Alert.alert("Error", "Unable to send reset code");
    },
  });

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    mutation.mutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot{`\n`}Password</Text>

      <Text style={styles.subtitle}>Enter your email address and we’ll send you a reset code</Text>

      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {mutation.isPending ? <ActivityIndicator size={"small"} /> : "Send Code"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 24 }}>
        <Text style={styles.backText}>Back to Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  subtitle: {
    color: "#666",
    marginBottom: 40,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 12,
    marginBottom: 32,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  backText: {
    textAlign: "center",
    color: "#444",
  },
});
