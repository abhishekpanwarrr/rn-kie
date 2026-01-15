import { changePassword } from "@/src/api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const router = useRouter();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [show, setShow] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      changePassword({
        current_password: current,
        new_password: next,
      }),
    onSuccess: () => {
      Alert.alert("Success", "Password changed successfully");
      router.back();
    },
    onError: (err: any) => {
      Alert.alert("Error", err.response?.data?.message || "Failed");
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 24 }}>Change Password</Text>

      <PasswordInput
        placeholder="Current password"
        value={current}
        onChange={setCurrent}
        show={show}
        toggle={() => setShow((p) => !p)}
      />

      <PasswordInput
        placeholder="New password"
        value={next}
        onChange={setNext}
        show={show}
        toggle={() => setShow((p) => !p)}
      />

      <Pressable
        onPress={() => {
          if (!current || !next) {
            Alert.alert("Error", "Fill all fields");
            return;
          }
          mutation.mutate();
        }}
        style={{
          backgroundColor: "#111",
          paddingVertical: 16,
          borderRadius: 30,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {mutation.isPending ? <ActivityIndicator size={"small"} /> : "Update Password"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const PasswordInput = ({ placeholder, value, onChange, show, toggle }: any) => (
  <View style={{ marginBottom: 20 }}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#DDD",
      }}
    >
      <TextInput
        placeholder={placeholder}
        secureTextEntry={!show}
        value={value}
        onChangeText={onChange}
        style={{ flex: 1, paddingVertical: 12 }}
      />
      <Pressable onPress={toggle}>
        <Ionicons name={show ? "eye-off" : "eye"} size={20} />
      </Pressable>
    </View>
  </View>
);
