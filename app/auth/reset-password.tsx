import { resetPassword } from "@/src/api/auth.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      resetPassword({
        email: email!,
        newPassword: password,
      }),
    onSuccess: () => {
      Alert.alert("Success", "Password reset successfully", [
        {
          text: "Login",
          onPress: () => router.replace("/auth/login"),
        },
      ]);
    },
    onError: (err: any) => {
      Alert.alert("Error", err.response?.data?.message || "Failed to reset password");
    },
  });

  const handleSubmit = () => {
    if (!password || !confirm) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    mutation.mutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <PasswordInput
        placeholder="New password"
        value={password}
        show={show}
        toggle={() => setShow((p) => !p)}
        onChange={setPassword}
      />

      <PasswordInput
        placeholder="Confirm password"
        value={confirm}
        show={show}
        toggle={() => setShow((p) => !p)}
        onChange={setConfirm}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {mutation.isPending ? "Updating..." : "Reset Password"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  show,
  toggle,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggle: () => void;
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      placeholder={placeholder}
      secureTextEntry={!show}
      value={value}
      onChangeText={onChange}
      placeholderTextColor="#888"
      style={styles.input}
    />
    <Pressable onPress={toggle}>
      <Ionicons name={show ? "eye-off" : "eye"} size={20} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
