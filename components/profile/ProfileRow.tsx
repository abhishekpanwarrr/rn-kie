import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
};

export default function ProfileRow({ icon, label, onPress, danger }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: danger ? 0 : 1,
        borderColor: "#EEE",
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#E53935" : "#9E9E9E"}
        style={{ width: 30 }}
      />

      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color: danger ? "#E53935" : "#111",
        }}
      >
        {label}
      </Text>

      {!danger && <Ionicons name="chevron-forward" size={18} color="#BBB" />}
    </TouchableOpacity>
  );
}
