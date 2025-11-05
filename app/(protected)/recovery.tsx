import Backup from "@/components/Backup";
import Restore from "@/components/Restore";
import { Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Recovery() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>RECOVERY OPTIONS:</Text>
      <View style={styles.separator}></View>
      <Backup />

      {/* Separator: */}
      <View style={styles.separator}></View>

      <Restore />
      <View style={styles.separator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
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
