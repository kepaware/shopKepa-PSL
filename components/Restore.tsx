import ProgressRow from "@/components/ProgressRow";
import { Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useContext, useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import * as FileSystem from "expo-file-system/legacy";
import { RecoveryContext } from "@/utils/RecoveryContext";

export default function Restore() {
  const { items } = useDBFunctions().useFetchAll();
  const recoveryContext = useContext(RecoveryContext);

  //Progress Indicators:
  const [access, setAccess] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [cleared, setCleared] = useState<boolean>(false);
  const [written, setWritten] = useState<boolean>(false);

  const btn1Title = written ? "Restore Complete" : "Restore Database";
  const btn1Color = written ? "#6dc491" : "#060a31";

  async function createFile(directory: string) {
    let file: string | null = null;

    try {
      const fileInfo =
        await FileSystem.StorageAccessFramework.readDirectoryAsync(
          directory
        ).then((fileInfo) => {
          //1. Check info array for 'shopKepa' entry:
          fileInfo.forEach((e) => {
            if (e.endsWith("menu.txt")) {
              console.log("fileExists: true");
              recoveryContext.setUri(e);
              file = e;
            }
          });
        });

      // console.log("file: ", file);
    } catch (error) {
      console.log("fileCheckError: ", error);
    }

    if (file !== null) {
      await FileSystem.StorageAccessFramework.deleteAsync(file).then(
        async () => {
          // console.log("Existing file deleted");

          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              directory,
              "menu",
              "text/plain"
            ).then((fileUri) => {
              // setCreated(true);
              console.log("File Created");
              return fileUri;
            });
        }
      );
    } else {
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        directory,
        "menu",
        "text/plain"
      ).then((fileUri) => {
        // setCreated(true);
        console.log("File Created");
        return fileUri;
      });
    }
    return file;
  }

  async function writeFile(fileUri: string) {
    const jsonData = JSON.stringify(items);

    try {
      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        fileUri,
        jsonData,
        { encoding: FileSystem.EncodingType.UTF8 }
      ).then(() => {
        // console.log("File written successfully!");
        setWritten(true);
      });
    } catch (error) {
      console.log("Write Error: ", error);
    }
  }

  async function restore() {
    const permissions =
      // 1. Request permissions for the parent directory:
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    // 2. Check permission was granted:
    if (!permissions.granted) {
      Alert.alert("Permissions not granted!");
      return;
    } else {
      setAccess(true);
      // console.log("Access granted");

      const { directoryUri } = permissions;

      // 3. Create empty menu file:
      const fileUri = await createFile(directoryUri).then(async (fileUri) => {
        // console.log("fileUri: ", fileUri);

        // 4. Write Menu to File:
        if (fileUri !== null) {
          await writeFile(fileUri);
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        {access && <ProgressRow description="Permissions granted:" />}
        {read && <ProgressRow description="Recovery File Read:" />}
        {cleared && <ProgressRow description="Existing Table Cleared:" />}
        {written && <ProgressRow description="Recovered Menu Restored:" />}
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
