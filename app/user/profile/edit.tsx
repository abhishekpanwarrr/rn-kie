import { getMe, updateMe } from "@/src/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: () => updateMe(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      Alert.alert("Profile updated");
      router.back();
    },
  });

  if (!form) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Edit Profile</Text>

        <Input
          label="First Name"
          value={form.first_name}
          onChange={(v) => setForm((p: any) => ({ ...p, first_name: v }))}
        />

        <Input
          label="Last Name"
          value={form.last_name}
          onChange={(v) => setForm((p: any) => ({ ...p, last_name: v }))}
        />

        <Input
          label="Phone"
          value={form.phone}
          onChange={(v) => setForm((p: any) => ({ ...p, phone: v }))}
        />

        <Pressable onPress={() => mutation.mutate()} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>
            {mutation.isPending ? <ActivityIndicator size={"small"} /> : "Save Changes"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput value={value} onChangeText={onChange} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 14,
  },
  primaryBtn: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
