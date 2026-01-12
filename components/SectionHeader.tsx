import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function SectionHeader({ title, onPress }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{title}</Text>

      {onPress && (
        <Pressable onPress={onPress}>
          <Text style={{ fontSize: 14, color: "#888" }}>Show all</Text>
        </Pressable>
      )}
    </View>
  );
}
