import { registerUser } from "@/src/api/auth.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const mutation = useMutation({
    mutationFn: () =>
      registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      }),
    onSuccess: async (data) => {
      Alert.alert("Account created", "Please log in to continue");
      router.replace("/auth/login");
    },
    onError: (err: any) => {
      Alert.alert("Registration failed", err.message || "Try again");
    },
  });

  const handleRegister = () => {
    if (!form.first_name || !form.email || !form.password) {
      Alert.alert("All fields are required");
      return;
    }

    if (form.password !== form.confirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    mutation.mutate();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 40 }}>
        Create{"\n"}your account
      </Text>

      <TextInput
        placeholder="Enter first name"
        style={styles.inputStyle}
        placeholderTextColor={"gray"}
        onChangeText={(v) => setForm((p) => ({ ...p, first_name: v }))}
      />
      <TextInput
        placeholder="Enter last name"
        style={styles.inputStyle}
        placeholderTextColor={"gray"}
        onChangeText={(v) => setForm((p) => ({ ...p, last_name: v }))}
      />
      <TextInput
        placeholder="Email address"
        style={styles.inputStyle}
        onChangeText={(v) => setForm((p) => ({ ...p, email: v }))}
        autoCapitalize="none"
        placeholderTextColor={"gray"}
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={[styles.inputStyle, { flex: 1, marginBottom: 0 }]}
          value={form.password}
          onChangeText={(v) => setForm((p) => ({ ...p, password: v }))}
          placeholderTextColor="gray"
        />

        <Pressable onPress={() => setShowPassword((p) => !p)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#666"
          />
        </Pressable>
      </View>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Confirm password"
          secureTextEntry={!showConfirm}
          style={[styles.inputStyle, { flex: 1, marginBottom: 0 }]}
          value={form.confirm}
          onChangeText={(v) => setForm((p) => ({ ...p, confirm: v }))}
          placeholderTextColor="gray"
        />

        <Pressable onPress={() => setShowConfirm((p) => !p)}>
          <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {mutation.isPending ? <ActivityIndicator size={"small"} /> : "SIGN UP"}
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginVertical: 20 }}>or sign up with</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
        <SocialCircle label="" />
        <SocialCircle label="G" />
        <SocialCircle label="f" />
      </View>

      <TouchableOpacity onPress={() => router.replace("/auth/login")} style={{ marginTop: 40 }}>
        <Text style={{ textAlign: "center" }}>
          Already have an account? <Text style={{ fontWeight: "700" }}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const SocialCircle = ({ label }: { label: string }) => (
  <View
    style={{
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: "#DDD",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 18 }}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 12,
    marginBottom: 24,
    color: "black",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 24,
  },
  buttonStyle: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
});
