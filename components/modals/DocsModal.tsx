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

import { overview, permissions, saving, restoring } from "@/utils/DocArrays";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function DocsModal({ showModal, setShowModal }: ModalProps) {
  const insets = useSafeAreaInsets();
  const [section, setSection] = useState("overview");

  //Link Colors:
  const linkOV = section === "overview" ? "blue" : "#555";
  const linkPerm = section === "permissions" ? "blue" : "#555";
  const linkSav = section === "saving" ? "blue" : "#555";
  const linkRest = section === "restoring" ? "blue" : "#555";

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <>
        <View style={[styles.topSection, { paddingTop: insets.top }]}>
          <Text style={styles.title}>RECOVERY:</Text>
          <Pressable
            style={{
              marginTop: 8,
              marginRight: 10,
            }}
            onPress={() => setShowModal(false)}
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
          {/* Scroll Links List: */}
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
                <Pressable onPress={() => setSection("restoring")}>
                  <Text style={[styles.link, { color: `${linkRest}` }]}>
                    RESTORING
                  </Text>
                </Pressable>
              </View>

              <View style={styles.linkRow}>
                <Pressable onPress={() => setSection("permissions")}>
                  <Text
                    style={[
                      styles.link,
                      { width: 120, color: `${linkPerm}`, paddingLeft: 4 },
                    ]}
                  >
                    PERMISSIONS
                  </Text>
                </Pressable>
                <Pressable onPress={() => setSection("saving")}>
                  <Text style={[styles.link, { color: `${linkSav}` }]}>
                    SAVING
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
                {overview.map((item) => {
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

            {section === "permissions" && (
              <View style={styles.textContainer}>
                {permissions.map((item) => {
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

            {section === "saving" && (
              <View style={styles.textContainer}>
                {saving.map((item) => {
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

            {section === "restoring" && (
              <View style={styles.textContainer}>
                {restoring.map((item) => {
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

            <View
              style={{
                borderColor: "#ccc",
                width: "93%",
                borderWidth: 0.5,
              }}
            />
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
    marginBottom: 30,
    paddingHorizontal: 4,
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
  title: {
    paddingLeft: 8,
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
  email: {
    color: "#491ab8",
    fontSize: 14,
    fontWeight: 700,
  },
  lineSpace: {
    lineHeight: 8,
  },
});
