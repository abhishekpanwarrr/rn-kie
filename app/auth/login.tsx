import { loginUser } from "@/src/api/auth.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);

      router.replace("/(tabs)");
    },
    onError: () => {
      Alert.alert("Login failed", "Invalid email or password");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 40 }}>
        Log into{"\n"}your account
      </Text>

      <TextInput
        placeholder="Email address"
        style={styles.inputStyle}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor={"gray"}
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={[styles.inputStyle, { flex: 1, marginBottom: 0 }]}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"gray"}
        />

        <Pressable onPress={() => setShowPassword((p) => !p)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#666"
          />
        </Pressable>
      </View>

      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginBottom: 24 }}
        onPress={() => router.push("/auth/forgot-password")}
      >
        <Text style={{ color: "#666" }}>Forgot Password?</Text>
      </TouchableOpacity>

      <Pressable
        style={styles.buttonStyle}
        onPress={() => {
          if (!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
          }
          loginMutation.mutate();
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {" "}
          {loginMutation.isPending ? <ActivityIndicator size={"small"} /> : "LOG IN"}
        </Text>
      </Pressable>

      <Text style={{ textAlign: "center", marginVertical: 20 }}>or log in with</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
        <SocialCircle label="" />
        <SocialCircle label="G" />
        <SocialCircle label="f" />
      </View>

      <Pressable onPress={() => router.replace("/auth/register")} style={{ marginTop: 40 }}>
        <Text style={{ textAlign: "center" }}>
          Don’t have an account? <Text style={{ fontWeight: "700" }}>Sign Up</Text>
        </Text>
      </Pressable>
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
  buttonStyle: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 12,
    marginBottom: 24,
    color: "#000",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 24,
  },
});
