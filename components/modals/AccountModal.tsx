import { SetStateAction } from "react";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Alert,
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

type ModalProps = {
  id: number;
  username: string;
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function AccountModal({
  id,
  username,
  showModal,
  setShowModal,
}: ModalProps) {
  const insets = useSafeAreaInsets();
  const { updateName } = useDBFunctions().useUpdateUser();
  const [newName, setNewName] = useState("");

  async function changeName() {
    let update = {
      id: id,
      newName: newName,
    };

    updateName({ update });
    setShowModal(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.heading}>Update Username:</Text>

        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>New Name:</Text>
          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            style={styles.textInput}
            placeholder="Enter new username..."
            defaultValue={username}
            onChangeText={(newText) => setNewName(newText)}
            autoCapitalize="none"
          />

          <View style={styles.submitSection}>
            <Pressable onPress={() => changeName()} style={styles.submitBtn}>
              <Text style={styles.btnText}>Submit Update</Text>
            </Pressable>
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
    marginVertical: 20,
  },
  inputSection: {
    width: "70%",
    flex: 1,
    justifyContent: "flex-start",
    // marginBottom: 20,
    // backgroundColor: "#ddd",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 500,
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
    width: "100%",
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#060a31",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
