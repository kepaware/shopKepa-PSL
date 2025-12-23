import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import EditItemModal from "./modals/EditItemModal";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDBFunctions } from "@/lib/DBUSE";
import { useState } from "react";

type ItemProps = {
  id: number;
  label: string;
  category?: string;
  list?: boolean;
  user_id?: string;
};

export default function MenuRow({ id, label, category, list }: ItemProps) {
  const { toggleList } = useDBFunctions().useToggleItem();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  function handleToggle() {
    let item = {
      id: id,
      list: list!,
    };
    toggleList({ item });
  }

  return (
    <>
      <Pressable style={styles.row} onLongPress={() => setShowEditModal(true)}>
        <View style={styles.deleteSection}>
          <Pressable onPress={() => setShowDeleteModal(true)}>
            <MaterialIcons name="delete" color="#666" size={22} />
          </Pressable>
        </View>

        <View style={styles.labelSection}>
          <Text style={styles.label}>{label}</Text>
        </View>

        <View style={styles.actionSection}>
          <Pressable onPress={handleToggle}>
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
          </Pressable>
        </View>

        {/* -------------- Modals --------------- */}

        <ConfirmDeleteModal
          id={id}
          label={label}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />

        <EditItemModal
          id={id}
          label={label}
          category={category!}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "98%",
    height: 38,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteSection: {
    width: "10%",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  labelSection: {
    width: "78%",
    height: 34,
    justifyContent: "center",
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
  },
});
