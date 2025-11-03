import Backup from "@/components/Backup";
import Restore from "@/components/Restore";
import { Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import * as FileSystem from "expo-file-system/legacy";
import { RecoveryContext } from "@/utils/RecoveryContext";

export default function Recovery() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>RECOVERY:</Text>
      <Backup />

      {/* Separator: */}
      <View style={styles.separator}></View>

      <Restore />
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
    width: "80%",
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
});
