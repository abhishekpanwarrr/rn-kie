import { verifyOtp } from "@/src/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
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
const OTP_EXPIRY_SECONDS = 10 * 60; // 10 minutes

export default function VerifyOtp() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputs = useRef<TextInput[]>([]);

  const mutation = useMutation({
    mutationFn: () => verifyOtp(email!, otp.join("")),
    onSuccess: () => {
      router.push({
        pathname: "/auth/reset-password",
        params: { email },
      });
    },
    onError: () => {
      Alert.alert("Invalid Code", "Please check the OTP and try again");
    },
  });

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((d) => d === "")) {
      Alert.alert("Error", "Enter complete OTP");
      return;
    }
    if (secondsLeft <= 0) {
      Alert.alert("OTP Expired", "Please request a new code");
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>

      <Text style={styles.subtitle}>
        We sent a 6-digit code to{`\n`}
        <Text style={{ fontWeight: "600" }}>{email}</Text>
      </Text>
      <Text style={styles.timerText}>
        {secondsLeft > 0 ? `Code expires in ${formatTime(secondsLeft)}` : "OTP expired"}
      </Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            // @ts-ignore
            ref={(ref) => (inputs.current[index] = ref!)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(v) => handleChange(v, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <Pressable
        style={[styles.button, secondsLeft <= 0 && { backgroundColor: "#AAA" }]}
        onPress={handleVerify}
        disabled={secondsLeft <= 0 || mutation.isPending}
      >
        <Text style={styles.buttonText}>
          {mutation.isPending ? <ActivityIndicator size={"small"} /> : "Verify"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 24 }}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

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
    color: "#666",
    marginBottom: 40,
    fontSize: 14,
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
  timerText: {
    color: "#888",
    marginBottom: 24,
  },
});
