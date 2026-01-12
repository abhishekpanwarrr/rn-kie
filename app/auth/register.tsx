import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 40 }}>
        Create{"\n"}your account
      </Text>

      <TextInput placeholder="Enter your name" style={styles.inputStyle} />
      <TextInput placeholder="Email address" style={styles.inputStyle} />
      <TextInput placeholder="Password" secureTextEntry style={styles.inputStyle} />
      <TextInput placeholder="Confirm password" secureTextEntry style={styles.inputStyle} />

      <Pressable style={styles.buttonStyle}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>SIGN UP</Text>
      </Pressable>

      <Text style={{ textAlign: "center", marginVertical: 20 }}>or sign up with</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
        <SocialCircle label="" />
        <SocialCircle label="G" />
        <SocialCircle label="f" />
      </View>

      <Pressable onPress={() => router.replace("/auth/login")} style={{ marginTop: 40 }}>
        <Text style={{ textAlign: "center" }}>
          Already have an account? <Text style={{ fontWeight: "700" }}>Log In</Text>
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
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
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
