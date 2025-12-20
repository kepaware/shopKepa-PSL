import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

type Props = {
  description: string;
};

export default function ProgressRow({ description }: Props) {
  return (
    <View
      style={{
        width: 300,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>{description}</Text>
      <Ionicons
        name="checkmark-circle"
        color="black"
        size={22}
        style={{ marginTop: 4 }}
      />
    </View>
  );
}
