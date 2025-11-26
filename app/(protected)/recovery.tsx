import Backup from "@/components/Backup";
import Restore from "@/components/Restore";
import DocsModal from "@/components/modals/DocsModal";
import { Text, Linking, StyleSheet, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function Recovery() {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topSection}>
        <Text style={[styles.heading, { marginLeft: 14, marginBottom: 6 }]}>
          RECOVERY OPTIONS:
        </Text>
        <Pressable
          style={{ marginTop: 20, marginRight: 16 }}
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="book" color="blue" size={24} />
        </Pressable>
      </View>

      <View style={styles.separator}></View>
      <Backup />

      <View style={styles.separator}></View>

      <Restore />
      <View style={styles.separator}></View>

      <Pressable
        style={styles.permissionsBtn}
        onPress={() => Linking.openSettings()}
      >
        <Text style={styles.btnText}>Clear Permissions</Text>
      </Pressable>

      {/* <View style={styles.separator}></View> */}
      <DocsModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    width: "100%",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 700,
  },
  permissionsBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#e00913",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  separator: {
    width: "90%",
    marginTop: 16,
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: "#000",
  },
});
