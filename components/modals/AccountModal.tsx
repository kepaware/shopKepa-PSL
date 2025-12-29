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
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const heading = `Change UserName:`;

  const reset = () => {
    setNewName("");
    setError("");
    setIsError(false);
  };

  const validateName = () => {
    const regex = /^[a-zA-Z0-9 -]+$/;
    let isValid = true;

    Array.from(newName).forEach((char) => {
      const result = regex.test(char);

      if (!result) {
        setError("Invalid character(s)!");
        setIsError(true);
        isValid = false;
      }
    });

    if (isValid) {
      return true;
    } else {
      return false;
    }
  };

  async function changeName() {
    const isValid = validateName();

    let update = {
      id: id,
      newName: newName,
    };

    if (isValid) {
      updateName({ update });
      setShowModal(false);
    }
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
        <Text style={styles.heading}>{heading}</Text>

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

          {isError && <Text style={styles.error}>{error}</Text>}

          <View style={styles.submitSection}>
            <Pressable
              onPress={() => setShowModal(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Update</Text>
            </Pressable>

            {!isError && (
              <Pressable onPress={() => changeName()} style={styles.submitBtn}>
                <Text style={styles.btnText}>Update</Text>
              </Pressable>
            )}
            {isError && (
              <Pressable onPress={() => reset()} style={styles.submitBtn}>
                <Text style={styles.btnText}>Try again!</Text>
              </Pressable>
            )}
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
    marginTop: 40,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
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
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#060a31",
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  cancelText: {
    color: "#000",
    fontSize: 16,
    fontWeight: 600,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  error: {
    fontSize: 16,
    fontWeight: 600,
    color: "red",
    marginTop: 14,
    paddingLeft: 4,
  },
});
