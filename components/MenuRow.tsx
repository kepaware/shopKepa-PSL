import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDBFunctions } from "@/lib/DBUSE";

type ItemProps = {
  id: number;
  label: string;
  category?: string;
  list?: boolean;
  user_id?: string;
};

export default function MenuRow({ id, label, list }: ItemProps) {
  const { toggleList } = useDBFunctions().useToggleItem();
  const { deleteMenuItem } = useDBFunctions().useDeleteItem();

  function handleToggle() {
    let item = {
      id: id,
      list: list!,
    };
    toggleList({ item });
  }

  return (
    <View style={styles.row}>
      <View style={styles.deleteSection}>
        <TouchableOpacity onPress={() => deleteMenuItem(id)}>
          <MaterialIcons name="delete" color="#666" size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.labelSection}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity onPress={handleToggle}>
          {list ? (
            <MaterialIcons
              name="remove-circle-outline"
              color="#ce1111"
              size={22}
              style={{ marginTop: 6 }}
            />
          ) : (
            <MaterialIcons
              name="add-circle-outline"
              color="#0e90c4"
              size={22}
              style={{ marginTop: 6 }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "98%",
    height: 38,
    // marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteSection: {
    width: "10%",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#333",
  },
  labelSection: {
    width: "78%",
    height: 34,
    justifyContent: "center",
    // backgroundColor: "#999",
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: 8,
  },
  actionSection: {
    width: "10%",
    height: 34,
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "#333",
  },
});
