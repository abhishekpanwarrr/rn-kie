import { createAddress } from "@/src/api/address.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function AddAddress() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    address_type: "home",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });
  const mutation = useMutation({
    mutationFn: () =>
      createAddress({
        address_type: "home",
        ...form,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.back(); // 🔁 return to checkout
    },
  });
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = () => {
    if (!form.address_line1 || !form.city || !form.country || !form.postal_code) {
      alert("Please fill all required fields");
      return;
    }
    mutation.mutate();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.title}>Add delivery address</Text>
        {/* Address Type Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Address Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.address_type}
              onValueChange={(itemValue) => handleChange("address_type", itemValue)}
              style={styles.picker}
              dropdownIconColor="#666"
            >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
        <TextInput
          placeholder="Address line 1"
          style={styles.input}
          value={form.address_line1}
          onChangeText={(v) => handleChange("address_line1", v)}
          placeholderTextColor={"gray"}
        />

        <TextInput
          placeholder="Address line 2 (optional)"
          style={styles.input}
          value={form.address_line2}
          onChangeText={(v) => handleChange("address_line2", v)}
          placeholderTextColor={"gray"}
        />

        <TextInput
          placeholder="City"
          style={styles.input}
          value={form.city}
          onChangeText={(v) => handleChange("city", v)}
          placeholderTextColor={"gray"}
        />

        <TextInput
          placeholder="State"
          style={styles.input}
          value={form.state}
          onChangeText={(v) => handleChange("state", v)}
          placeholderTextColor={"gray"}
        />

        <TextInput
          placeholder="Country"
          style={styles.input}
          value={form.country}
          onChangeText={(v) => handleChange("country", v)}
          placeholderTextColor={"gray"}
        />

        <TextInput
          placeholder="Postal code"
          style={styles.input}
          keyboardType="number-pad"
          value={form.postal_code}
          onChangeText={(v) => handleChange("postal_code", v)}
          placeholderTextColor={"gray"}
        />

        <Pressable onPress={handleSubmit} style={styles.primaryBtn} disabled={mutation.isPending}>
          {mutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryText}>Save Address</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    color: "#000",
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#000",
  },
  primaryBtn: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
