import { SetStateAction, useState } from "react";
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

import { mainOverview, recovery, uninstall, contact } from "@/utils/DocArrays";

type ModalProps = {
  showDocsModal: boolean;
  setShowDocsModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function MainDocsModal({
  showDocsModal,
  setShowDocsModal,
}: ModalProps) {
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState("overview");

  //Link Colors:
  const linkOV = section === "overview" ? "blue" : "#555";
  const linkRec = section === "recovery" ? "blue" : "#555";
  const linkRem = section === "uninstall" ? "blue" : "#555";
  const linkCon = section === "contact" ? "blue" : "#555";

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showDocsModal}
      onRequestClose={() => setShowDocsModal(false)}
    >
      <>
        <View style={[styles.topSection, { paddingTop: insets.top }]}>
          <Text style={[styles.title, { paddingLeft: 4 }]}>
            ABOUT SHOPKEPA:
          </Text>
          <Pressable
            style={{
              marginTop: 8,
              marginRight: 10,
            }}
            onPress={() => setShowDocsModal(false)}
          >
            <Ionicons name="close-circle" color="#333" size={26} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 10 },
          ]}
        >
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 4 }}>
              <View style={styles.linkRow}>
                <Pressable onPress={() => setSection("overview")}>
                  <Text
                    style={[
                      styles.link,
                      { width: 120, color: `${linkOV}`, paddingLeft: 4 },
                    ]}
                  >
                    OVERVIEW
                  </Text>
                </Pressable>
                <Pressable onPress={() => setSection("recovery")}>
                  <Text style={[styles.link, { color: `${linkRec}` }]}>
                    RECOVERY
                  </Text>
                </Pressable>
              </View>

              <View style={styles.linkRow}>
                <Pressable onPress={() => setSection("uninstall")}>
                  <Text
                    style={[
                      styles.link,
                      { width: 120, color: `${linkRem}`, paddingLeft: 4 },
                    ]}
                  >
                    UNINSTALLING
                  </Text>
                </Pressable>
                <Pressable onPress={() => setSection("contact")}>
                  <Text style={[styles.link, { color: `${linkCon}` }]}>
                    CONTACT
                  </Text>
                </Pressable>
              </View>
            </View>

            <View
              style={{
                marginVertical: 20,
                borderColor: "#ccc",
                width: "93%",
                borderWidth: 0.5,
              }}
            />

            {section === "overview" && (
              <View style={styles.textContainer}>
                {mainOverview.map((item) => {
                  if (item.key === 0) {
                    return (
                      <Text style={styles.heading} key={item.key}>
                        {item.text}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={item.key} style={styles.textStyle}>
                        {item.text}
                      </Text>
                    );
                  }
                })}
              </View>
            )}

            {section === "recovery" && (
              <View style={styles.textContainer}>
                {recovery.map((item) => {
                  if (item.key === 0) {
                    return (
                      <Text style={styles.heading} key={item.key}>
                        {item.text}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={item.key} style={styles.textStyle}>
                        {item.text}
                      </Text>
                    );
                  }
                })}
              </View>
            )}

            {section === "uninstall" && (
              <View style={styles.textContainer}>
                {uninstall.map((item) => {
                  if (item.key === 0) {
                    return (
                      <Text style={styles.heading} key={item.key}>
                        {item.text}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={item.key} style={styles.textStyle}>
                        {item.text}
                      </Text>
                    );
                  }
                })}
              </View>
            )}

            {section === "contact" && (
              <View style={styles.textContainer}>
                {contact.map((item) => {
                  if (item.key === 0) {
                    return (
                      <Text style={styles.heading} key={item.key}>
                        {item.text}
                      </Text>
                    );
                  } else if (item.key === 20) {
                    return (
                      <Text key={item.key} style={styles.email}>
                        {item.text}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={item.key} style={styles.textStyle}>
                        {item.text}
                      </Text>
                    );
                  }
                })}
              </View>
            )}
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
  linkRow: { flexDirection: "row", alignItems: "center", gap: 50 },
  link: { marginVertical: 6, fontSize: 15, fontWeight: 700 },
  linkText: {
    marginVertical: 6,
    fontSize: 16,
    color: "#093be2",
    textDecorationLine: "underline",
  },
  email: {
    color: "#491ab8",
    fontSize: 14,
    fontWeight: 700,
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
