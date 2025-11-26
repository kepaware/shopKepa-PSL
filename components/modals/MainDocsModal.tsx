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
  recoveryTxt1,
  uninstallTxt1,
  uninstallTxt2,
  uninstallTxt3,
  uninstallTxt4,
  uninstallTxt5,
  uninstallTxt6,
  uninstallTxt7,
  uninstallTxt8,
  uninstallTxt9,
  uninstallTxt10,
  contactTxt1,
  contactTxt2,
} from "@/utils/MainDocsText";

type ModalProps = {
  showDocsModal: boolean;
  setShowDocsModal: React.Dispatch<SetStateAction<boolean>>;
};

type OffsetProps = {
  y: number;
};

export default function MainDocsModal({
  showDocsModal,
  setShowDocsModal,
}: ModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showDocsModal}
      onRequestClose={() => setShowDocsModal(false)}
    >
      <>
        <View style={[styles.topSection, { paddingTop: insets.top }]}>
          <Text style={styles.title}>ABOUT SHOPKEPA:</Text>
          <Pressable
            style={{
              marginTop: 8,
              marginRight: 10,
            }}
            onPress={() => setShowDocsModal(false)}
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
            <Text style={styles.heading}>RECOVERY:</Text>
            <Text style={styles.textStyle}>{recoveryTxt1}</Text>
            <Text style={styles.heading}>UNINSTALLING:</Text>
            <Text style={styles.textStyle}>{uninstallTxt1}</Text>
            <Text style={styles.textStyle}>{uninstallTxt2}</Text>
            <Text style={styles.textStyle}>{uninstallTxt3}</Text>
            <Text style={styles.textStyle}>{uninstallTxt4}</Text>
            <Text style={styles.textStyle}>{uninstallTxt5}</Text>
            <Text style={styles.textStyle}>{uninstallTxt6}</Text>
            <Text style={styles.textStyle}>{uninstallTxt7}</Text>
            <Text style={styles.textStyle}>{uninstallTxt8}</Text>
            <Text style={styles.textStyle}>{uninstallTxt9}</Text>
            <Text style={styles.textStyle}>{uninstallTxt10}</Text>
            <Text style={styles.heading}>CONTACT:</Text>
            <Text style={styles.textStyle}>{contactTxt1}</Text>
            <Text style={styles.textStyle1a}>{contactTxt2}</Text>
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
  },
  textStyle1a: {
    marginTop: 0,
    marginLeft: 20,
    paddingTop: 0,
    // marginHorizontal: 10,
    marginBottom: 8,
    textAlign: "justify",
    lineHeight: 16,
    fontWeight: 700,
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
