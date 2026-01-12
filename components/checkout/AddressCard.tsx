import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  address: any;
  selected?: boolean;
  onSelect?: () => void;
};

export default function AddressCard({ address, selected, onSelect }: Props) {
  return (
    <Pressable
      onPress={onSelect}
      style={{
        borderWidth: 1,
        borderColor: selected ? "#111" : "#EEE",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>
          {address.address_type.toUpperCase()}
        </Text>

        {selected && <Ionicons name="checkmark-circle" size={20} color="#111" />}
      </View>

      <Text>{address.address_line1}</Text>
      <Text style={{ color: "#666", marginTop: 4 }}>
        {address.city}, {address.state} {address.postal_code}
      </Text>
      <Text style={{ color: "#666" }}>{address.country}</Text>
    </Pressable>
  );
}
