import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  attributes: Record<string, string[]>;
  selected: Record<string, string>;
  onSelect: (key: string, value: string) => void;
};

export default function VariantSelector({ attributes, selected, onSelect }: Props) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {Object.entries(attributes).map(([key, values]) => (
        <View key={key} style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, fontWeight: "600" }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {values.map((value) => {
              const isActive = selected[key] === value;

              return (
                <Pressable
                  key={value}
                  onPress={() => onSelect(key, value)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: isActive ? "#111" : "#F2F2F2",
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? "#fff" : "#111",
                      fontWeight: "500",
                    }}
                  >
                    {value}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
