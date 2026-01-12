import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  active?: boolean;
  onPress: () => void;
};

export default function CategoryPill({ name, active, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>{name.charAt(0)}</Text>
        </View>

        <Text style={{ fontSize: 12 }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
