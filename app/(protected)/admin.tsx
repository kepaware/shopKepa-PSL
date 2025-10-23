import { Text, StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Admin() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>ADMINISTRATION:</Text>

      <Pressable style={styles.option}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Backup Menu Items to a file</Text>
          <Text style={styles.optionCaret}>&gt;</Text>
        </View>
      </Pressable>
      <Pressable style={styles.option}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Recover Menu Items from file</Text>
          <Text style={styles.optionCaret}>&gt;</Text>
        </View>
      </Pressable>
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
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 700,
  },
  option: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  optionRow: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    fontWeight: 400,
  },
  optionCaret: {
    fontSize: 20,
    // fontWeight: 600,
  },
});
