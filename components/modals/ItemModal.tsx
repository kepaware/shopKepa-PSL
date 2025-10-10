import ToggleBtn from "../ToggleBtn";
import { SetStateAction } from "react";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Modal,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddProps = {
  item: {
    newLabel: string;
    newCategory: string;
  };
};

type Props = {
  showItemModal: boolean;
  setShowItemModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function ItemModal({ showItemModal, setShowItemModal }: Props) {
  const insets = useSafeAreaInsets();
  const { newItem } = useDBFunctions().useAddItem();

  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("main");
  const [multiple, setMultiple] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);

  const clearInputs = () => {
    setLabel("");
  };

  const toggleSwitch = () => {
    setMultiple((previousState) => !previousState);
  };

  async function handleSave() {
    let item = {
      newLabel: label,
      newCategory: category,
    };

    newItem({ item });

    if (!multiple) {
      clearInputs();
      setShowItemModal(false);
    } else {
      clearInputs();
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showItemModal}
      onRequestClose={() => setShowItemModal(false)}
    >
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>Add New Item:</Text>

        {/* Label Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.labelText}>Item Name:</Text>

          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            placeholder=""
            style={styles.labelInput}
            value={label}
            onChangeText={(value) => {
              setLabel(value);
            }}
          />
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
              setCategory={setCategory}
            />
            <ToggleBtn
              id={2}
              cat="f/v"
              label="F/V"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setCategory}
            />
            <ToggleBtn
              id={3}
              cat="pet"
              label="Pet"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setCategory}
            />
            <ToggleBtn
              id={4}
              cat="other"
              label="Other"
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              setCategory={setCategory}
            />
          </View>
        </View>

        {/* Toggle Switch: */}
        <View style={styles.switchSection}>
          <Text style={styles.switchText}>Create Multiple Items:</Text>

          <Switch
            trackColor={{ false: "#999", true: "#2427d8" }}
            thumbColor={multiple ? "#2427d8" : "#999"}
            value={multiple}
            onValueChange={toggleSwitch}
          />
        </View>

        {/* Add Item Button:  */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            handleSave();
          }}
        >
          <Text style={styles.saveBtnText}>Add New Item</Text>
        </TouchableOpacity>
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
});
