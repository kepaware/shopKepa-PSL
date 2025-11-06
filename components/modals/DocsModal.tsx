import { SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import {
  overviewTxt1,
  overviewTxt2,
  overviewTxt3,
  permissionsTxt1,
  permissionsTxt2,
  savingTxt1,
  savingTxt2,
  savingTxt3,
  savingTxt4,
  restoreTxt1,
  restoreTxt2,
  restoreTxt3,
  restoreTxt4,
  restoreTxt5,
} from "@/utils/DocsText";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function DocsModal({ showModal, setShowModal }: ModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Pressable
          style={{ marginLeft: 10, position: "absolute", top: 38, right: 34 }}
          onPress={() => setShowModal(false)}
        >
          <Ionicons name="close-circle" color="darkred" size={26} />
        </Pressable>
        <Text style={styles.title}>DOCUMENTATION:</Text>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>OVERVIEW:</Text>
          <Text style={styles.textStyle}>{overviewTxt1}</Text>
          <Text style={styles.textStyle}>{overviewTxt2}</Text>
          <Text style={styles.textStyle}>{overviewTxt3}</Text>
          <Text style={styles.heading}>PERMISSIONS:</Text>
          <Text style={styles.textStyle}>{permissionsTxt1}</Text>
          <Text style={styles.textStyle}>{permissionsTxt2}</Text>
          <Text style={styles.heading}>SAVING YOUR MENU:</Text>
          <Text style={styles.textStyle}>{savingTxt1}</Text>
          <Text style={styles.textStyle}>{savingTxt2}</Text>
          <Text style={styles.textStyle}>{savingTxt3}</Text>
          <Text style={styles.textStyle}>{savingTxt4}</Text>
          <Text style={styles.heading}>RESTORING YOUR MENU:</Text>
          <Text style={styles.textStyle}>{restoreTxt1}</Text>
          <Text style={styles.textStyle}>{restoreTxt2}</Text>
          <Text style={styles.textStyle}>{restoreTxt3}</Text>
          <Text style={styles.textStyle}>{restoreTxt4}</Text>
          <Text style={styles.textStyle}>{restoreTxt5}</Text>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
  },
  textContainer: {
    marginBottom: 20,
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 0,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 14,
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
    color: "blue",
    marginTop: 6,
    marginBottom: 6,
  },
  textStyle: {
    marginTop: 0,
    paddingTop: 0,
    marginHorizontal: 10,
    marginBottom: 8,
    textAlign: "justify",
    lineHeight: 16,
    // flexWrap: "wrap",
  },
  textStyle2: {
    marginTop: 0,
    paddingTop: 0,
    marginHorizontal: 10,
    textAlign: "justify",
    lineHeight: 16,
  },
  lineSpace: {
    lineHeight: 8,
  },
});
