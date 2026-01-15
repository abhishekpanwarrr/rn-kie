import { sendEmailVerification, verifyEmail } from "@/src/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  // 🔹 Send OTP automatically
  const sendMutation = useMutation({
    mutationFn: sendEmailVerification,
    onError: () => Alert.alert("Error", "Failed to send verification code"),
  });

  const verifyMutation = useMutation({
    mutationFn: () => verifyEmail(otp.join("")),
    onSuccess: () => {
      Alert.alert("Success", "Email verified");
      router.back();
    },
    onError: () => Alert.alert("Invalid Code", "Try again"),
  });

  useEffect(() => {
    sendMutation.mutate();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>

      <View style={styles.otpRow}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            // @ts-ignore
            ref={(r) => (inputs.current[i] = r!)}
            style={styles.otpInput}
            value={d}
            onChangeText={(v) => handleChange(v, i)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <Pressable style={styles.button} onPress={() => verifyMutation.mutate()}>
        <Text style={styles.buttonText}>
          {verifyMutation.isPending ? <ActivityIndicator size={"small"} /> : "Verify"}
        </Text>
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
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
    lineHeight: 20,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
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
    fontSize: 16,
  },
});
