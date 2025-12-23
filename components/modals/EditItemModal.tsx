import ToggleBtn from "../ToggleBtn";
import { SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDBFunctions } from "@/lib/DBUSE";

import {
  Modal,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  Pressable,
  View,
} from "react-native";

type Props = {
  id: number;
  label: string;
  category: string;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function EditItemModal({
  id,
  label,
  category,
  showEditModal,
  setShowEditModal,
}: Props) {
  const { editItem } = useDBFunctions().useUpdateItem();
  const insets = useSafeAreaInsets();
  const [activeBtn, setActiveBtn] = useState(1);
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const reset = () => {
    setNewLabel("");
    setError("");
    setIsError(false);
  };

  const validateLabel = () => {
    const regex = /^[a-zA-Z0-9 -]+$/;
    let isValid = true;

    Array.from(newLabel).forEach((char) => {
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

  async function handleUpdate() {
    const isValid = validateLabel();

    const itemID = id;

    let update = {
      label: newLabel !== "" ? newLabel : label,
      category: newCategory !== "" ? newCategory : category,
    };

    if (isValid) {
      editItem({ itemID, update });
      setShowEditModal(false);
    }
  }

  useEffect(() => {
    if (category === "main") {
      setActiveBtn(1);
    } else if (category === "f/v") {
      setActiveBtn(2);
    } else if (category === "pet") {
      setActiveBtn(3);
    } else {
      setActiveBtn(4);
    }
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showEditModal}
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>Update Item:</Text>

        {/* Label Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.labelText}>Item Label:</Text>

          <TextInput
            autoFocus
            showSoftInputOnFocus={true}
            placeholder="Alpha/numeric/space/hyphen"
            style={styles.labelInput}
            defaultValue={label}
            onChangeText={(value) => {
              setNewLabel(value);
            }}
          />

          {isError && <Text style={styles.error}>{error}</Text>}
        </View>

        {/* Category Toggles */}
        <View>
          <Text style={styles.labelText}>Category:</Text>

          <View
            style={{
              marginTop: 2,
              marginBottom: 20,
              flexDirection: "row",
              gap: 0,
            }}
          >
            <ToggleBtn
              id={1}
              cat="main"
              label="Main"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setNewCategory}
            />
            <ToggleBtn
              id={2}
              cat="f/v"
              label="F/V"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setNewCategory}
            />
            <ToggleBtn
              id={3}
              cat="pet"
              label="Pet"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setNewCategory}
            />
            <ToggleBtn
              id={4}
              cat="other"
              label="Other"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setNewCategory}
            />
          </View>
        </View>

        {/* Add Item Button:  */}
        {!isError && (
          <Pressable
            style={styles.saveBtn}
            onPress={() => {
              handleUpdate();
            }}
          >
            <Text style={styles.saveBtnText}>Update Item</Text>
          </Pressable>
        )}
        {isError && (
          <Pressable
            style={styles.saveBtn}
            onPress={() => {
              reset();
            }}
          >
            <Text style={styles.saveBtnText}>Try again!</Text>
          </Pressable>
        )}
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
  },
  modal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ddd",
  },
  heading: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 500,
    color: "blue",
  },
  labelText: {
    fontSize: 14,
    marginBottom: 4,
  },
  labelInput: {
    marginTop: 4,
    color: "#000",
    height: 38,
    width: 240,
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  borderTop: {
    marginTop: 26,
    width: 300,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  messageText1: {
    color: "#000",
    marginTop: 20,
    fontSize: 17,
  },
  modalInputText: {
    fontSize: 16,
    paddingLeft: 8,
    textAlignVertical: "center",
  },
  switchSection: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  switchText: {
    marginLeft: 6,
    color: "#000",
    fontSize: 18,
    fontWeight: 600,
  },
  saveBtn: {
    marginTop: 20,
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderRadius: 6,
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#c4c9e7",
  },
  error: {
    fontSize: 16,
    fontWeight: 600,
    color: "red",
    marginTop: 14,
    paddingLeft: 4,
  },
});
