import { SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import {
  overview,
  permissions,
  saving,
  restoring,
  contact,
} from "@/utils/DocArrays";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function DocsModal({ showModal, setShowModal }: ModalProps) {
  const insets = useSafeAreaInsets();
  const ref = useRef<ScrollView | null>(null);
  const [overviewY, setOverviewY] = useState<number>(0);
  const [permissionsY, setPermissionsY] = useState<number>();
  const [savingY, setSavingY] = useState<number>(0);
  const [restoringY, setRestoringY] = useState<number>(0);
  const [contactY, setContactY] = useState<number>(0);

  const viewSection = (position: number) => {
    console.log("Section: ", permissionsY);
    console.log("Coords: ", position);

    ref.current!.scrollTo({ y: position + 40, animated: true });
  };

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
            <Ionicons name="close-circle" color="darkred" size={26} />
          </Pressable>
        </View>

        <ScrollView
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 10 },
          ]}
        >
          {/* Scroll Links List: */}
          <View style={styles.textContainer}>
            <View style={{ marginBottom: 4 }}>
              <Pressable onPress={() => viewSection(overviewY)}>
                <Text style={styles.link}>1. Overview</Text>
              </Pressable>
              <Pressable onPress={() => viewSection(permissionsY!)}>
                <Text style={styles.link}>2. Permissions</Text>
              </Pressable>
              <Pressable onPress={() => viewSection(savingY!)}>
                <Text style={styles.link}>3. Saving</Text>
              </Pressable>
              <Pressable onPress={() => viewSection(restoringY!)}>
                <Text style={styles.link}>4. Restoring</Text>
              </Pressable>
              <Pressable onPress={() => viewSection(contactY!)}>
                <Text style={styles.link}>5. Contact</Text>
              </Pressable>
            </View>

            {/* Overview */}
            {overview.map((item) => {
              if (item.key === 0) {
                return (
                  <Text
                    style={styles.heading}
                    key={item.key}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      setOverviewY(layout.y - 40);
                    }}
                  >
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
            {/* Permissions */}
            {permissions.map((item) => {
              if (item.key === 0) {
                return (
                  <Text
                    style={styles.heading}
                    key={item.key}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      setPermissionsY(layout.y + 20);
                    }}
                  >
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
            {/* Saving: */}
            {saving.map((item) => {
              if (item.key === 0) {
                return (
                  <Text
                    style={styles.heading}
                    key={item.key}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      setSavingY(layout.y);
                    }}
                  >
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
            {/* Restoring: */}
            {restoring.map((item) => {
              if (item.key === 0) {
                return (
                  <Text
                    style={styles.heading}
                    key={item.key}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      setRestoringY(layout.y);
                    }}
                  >
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
            {/* Contact: */}
            {contact.map((item) => {
              if (item.key === 0) {
                return (
                  <Text
                    style={styles.heading}
                    key={item.key}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      setContactY(layout.y);
                    }}
                  >
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
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 0,
    flexWrap: "wrap",
  },
  link: { marginVertical: 6, color: "#491ab8", fontSize: 16, fontWeight: 700 },
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
  email: {
    color: "#491ab8",
    fontSize: 14,
    fontWeight: 700,
  },
  lineSpace: {
    lineHeight: 8,
  },
});
