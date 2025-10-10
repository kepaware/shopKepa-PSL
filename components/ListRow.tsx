import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDBFunctions } from "@/lib/DBUSE";

type ItemProps = {
  id: number;
  label: string;
  list: boolean;
};

export default function ListRow({ id, label, list }: ItemProps) {
  const { isUpdating, toggleList } = useDBFunctions().useToggleItem();

  function handleToggle() {
    let item = {
      id: id,
      list: list,
    };
    toggleList({ item });
  }

  return (
    <View style={styles.row}>
      <View style={styles.labelSection}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity onPress={handleToggle}>
          <MaterialIcons
            name="task-alt"
            color="#1b30a7"
            size={22}
            style={{ marginBottom: 3 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "98%",
    height: 32,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  labelSection: {
    width: "88%",
    height: 32,
    justifyContent: "center",
    // backgroundColor: "#999",
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: 8,
  },
  actionSection: {
    width: "8%",
    height: 32,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    // backgroundColor: "#333",
  },
});
