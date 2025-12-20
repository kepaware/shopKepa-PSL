import { SetStateAction } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";

type ModalProps = {
  id: number;
  label: string;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmDeleteModal({
  id,
  label,
  showDeleteModal,
  setShowDeleteModal,
}: ModalProps) {
  const insets = useSafeAreaInsets();
  const { deleteMenuItem } = useDBFunctions().useDeleteItem();

  async function handleDelete(id: number) {
    deleteMenuItem(id);
    setShowDeleteModal(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showDeleteModal}
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>Delete a Menu Item:</Text>

          <View style={styles.textSection}>
            <Text style={styles.deleteText}>
              Do you want to remove this item from the menu?
            </Text>
            <Text style={styles.label}>"{label}"</Text>

            <View style={styles.submitSection}>
              <Pressable
                onPress={() => setShowDeleteModal(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => handleDelete(id)}
                style={styles.submitBtn}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "76%",
    height: 300,
    borderRadius: 6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
    marginTop: 40,
    marginBottom: 20,
  },
  textSection: {
    width: "70%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 16,
    fontWeight: 500,
    color: "black",
    marginBottom: 14,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
    color: "black",

    marginBottom: 8,
    marginLeft: 2,
  },
  textInput: {
    width: "100%",
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
  },
  submitSection: {
    marginTop: 20,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },

  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#060a31",
  },
  cancelBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: 600,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
