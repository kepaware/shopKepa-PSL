import ProgressRow from "@/components/ProgressRow";
import type { SeedArray } from "@/lib/Types";
import { Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import * as FileSystem from "expo-file-system/legacy";

export default function Restore() {
  const { clearTable } = useDBFunctions().useClearMenuTable();
  const { seedDB } = useDBFunctions().useSeedDatabase();

  //Progress Indicators:
  const [access, setAccess] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [cleared, setCleared] = useState<boolean>(false);
  const [written, setWritten] = useState<boolean>(false);

  const btn1Title = written ? "Restore Complete" : "Restore Database";
  const btn1Color = written ? "#6dc491" : "#060a31";

  async function readFile(directoryUri: string) {
    try {
      let fileUri: string | null = null;
      let itemsJson: SeedArray | null = null;

      const fileList =
        await FileSystem.StorageAccessFramework.readDirectoryAsync(
          directoryUri
        );

      fileList.forEach((e) => {
        if (e.endsWith("menu.txt")) {
          fileUri = e;
        }
      });

      if (fileUri !== null) {
        const itemString =
          await FileSystem.StorageAccessFramework.readAsStringAsync(
            fileUri
          ).then((itemString) => {
            let tempJson = JSON.parse(itemString);
            itemsJson = tempJson;
          });
        return itemsJson;
      } else {
        Alert.alert("No recovery file found in the selected directory!");
        return null;
      }
    } catch (error) {
      console.log("Read File Error: ", error);
    }
  }

  async function restore() {
    // 1.  Clear Menu Table:
    clearTable();
    setCleared(true);

    let fileItemsArray: any;

    // 1. Request permissions for the parent directory:
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    // 2. Check permission was granted:
    if (!permissions.granted) {
      Alert.alert("Permissions not granted!");
      return;
    } else {
      setAccess(true);
      try {
        const itemsArray = await readFile(permissions.directoryUri);

        if (itemsArray === null) {
          return;
        } else {
          fileItemsArray = itemsArray;
          setRead(true);

          seedDB({ fileItemsArray });
          setWritten(true);
        }
      } catch (error) {
        Alert.alert("Restoration Failed!");
        console.log("Restore Error: ", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>RESTORE MENU FROM STORAGE:</Text>

      <View style={{ marginTop: 10, marginBottom: 20 }}>
        {access && <ProgressRow description="Permissions granted:" />}
        {cleared && <ProgressRow description="Existing Table Cleared:" />}
        {read && <ProgressRow description="Recovery File Read:" />}
        {written && <ProgressRow description="Menu Items Restored:" />}
      </View>

      <Pressable
        style={[
          styles.submitBtn,
          { marginBottom: 10, backgroundColor: `${btn1Color}` },
        ]}
        disabled={written}
        onPress={async () => await restore()}
      >
        <Text style={styles.btnText}>{btn1Title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "80%",
    height: "auto",
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#777",
  },
  heading: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 700,
  },
  subHeading: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 700,
    color: "blue",
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
});
