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
  overviewTxt4,
  permissionsTxt1,
  permissionsTxt2,
  permissionsTxt3,
  permissionsTxt4,
  permissionsTxt5,
  permissionsTxt6,
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
      <>
        <View style={[styles.topSection, { paddingTop: insets.top }]}>
          <Text style={styles.title}>DOCUMENTATION:</Text>
          <Pressable
            style={{
              marginTop: 8,
              marginRight: 10,
            }}
            onPress={() => setShowModal(false)}
          >
            <Ionicons name="close-circle" color="darkred" size={26} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 10 },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.heading}>OVERVIEW:</Text>
            <Text style={styles.textStyle}>{overviewTxt1}</Text>
            <Text style={styles.textStyle}>{overviewTxt2}</Text>
            <Text style={styles.textStyle}>{overviewTxt3}</Text>
            <Text style={styles.textStyle}>{overviewTxt4}</Text>

            <Text style={styles.heading}>PERMISSIONS:</Text>
            <Text style={styles.textStyle}>{permissionsTxt1}</Text>
            <Text style={styles.textStyle}>{permissionsTxt2}</Text>
            <Text style={styles.textStyle}>{permissionsTxt3}</Text>
            <Text style={styles.textStyle}>{permissionsTxt4}</Text>
            <Text style={styles.textStyle}>{permissionsTxt5}</Text>
            <Text style={styles.textStyle}>{permissionsTxt6}</Text>

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
      </>
    </Modal>
  );
}

const styles = StyleSheet.create({
  topSection: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  linkText: {
    marginVertical: 6,
    fontSize: 16,
    color: "#093be2",
    textDecorationLine: "underline",
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
