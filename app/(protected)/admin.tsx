import { Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import * as FileSystem from "expo-file-system/legacy";
import { RecoveryContext } from "@/utils/RecoveryContext";
import { useRouter } from "expo-router";

export default function Admin() {
  const router = useRouter();
  const { items } = useDBFunctions().useFetchAll();
  const recoveryContext = useContext(RecoveryContext);
  const insets = useSafeAreaInsets();

  const dirResult = recoveryContext.dirUri === null ? "No" : "Yes";
  const fileResult = recoveryContext.fileExists ? "Yes" : "No";
  const [externalDirCheck, setExternalDirCheck] = useState(false);

  async function checkDirectoryExists(directoryUri: string) {
    let dir: string | null = null;

    const info = await FileSystem.StorageAccessFramework.readDirectoryAsync(
      directoryUri
    ).then((info) => {
      //1. Check info array for 'shopKepa' entry:
      info.forEach((e) => {
        if (e.endsWith("shopKepa")) {
          console.log("dirExists: true");
          recoveryContext.setDir(e);
          dir = e;
        }
      });
    });
    return dir;
  }

  async function checkFileExists(directory: string) {
    let file: string | null = null;

    const fileInfo = await FileSystem.StorageAccessFramework.readDirectoryAsync(
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
    return file;
  }

  async function createDirectoryAndFile(directoryUri: string) {
    try {
      const directory =
        await FileSystem.StorageAccessFramework.makeDirectoryAsync(
          directoryUri,
          "shopKepa"
        ).then(async (directory) => {
          recoveryContext.setDir(directory);
          Alert.alert("Directory created successfully");

          // 5. Create an empty file:
          try {
            const menuUri =
              await FileSystem.StorageAccessFramework.createFileAsync(
                directory,
                "menu",
                "text/plain"
              ).then((menuUri) => {
                recoveryContext.setUri(menuUri);
                recoveryContext.setExists(true);
              });
          } catch (error) {
            Alert.alert(`${error}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function createMenuFile(dirUri: string) {
    try {
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        dirUri,
        "menu",
        "text/plain"
      ).then((fileUri) => {
        recoveryContext.setUri(fileUri);
        recoveryContext.setExists(true);
        // router.replace("/admin");

        Alert.alert(`Configuration successful`);
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  }

  async function configure() {
    const permissions =
      // 1. Request permissions for the parent directory::
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    // 2. Check permission was granted:
    if (!permissions.granted) {
      Alert.alert("Permissions not granted!");
      return;
    } else {
      // 3. Get the URI of the selected directory:
      const { directoryUri } = permissions;

      // 4. Check if the parent directory has a shopKepa folder:
      const directory = await checkDirectoryExists(directoryUri);

      // If no shopKepa folder exists, create it and the menu file:
      if (directory === null) {
        await createDirectoryAndFile(directoryUri);
      } else {
        //If the folder exists, check if the menu file exists too:
        const menuUri = await checkFileExists(directory);

        if (menuUri === null) {
          //If the file doesn't exist, create it:
          await createMenuFile(recoveryContext.dirUri!).then();
        } else {
          console.log("Directory and File exist");
        }
      }
    }
  }

  // async function handleSave() {
  //   const directory = recoveryContext.dirUri;
  //   const exists = recoveryContext.fileExists;

  //   if (directory === null && !externalDirCheck) {
  //     createDirectoryAndFile();
  //   } else if (directory !== null && !exists) {
  //     createMenuFile();
  //   } else {
  //     console.log("Directory and File Exist");
  //   }

  //   //Write to the File:
  //   const jsonData = JSON.stringify(items);
  //   console.log("writeData: ", jsonData);

  // try {
  //   await FileSystem.StorageAccessFramework.writeAsStringAsync(
  //     recoveryContext.fileUri!,
  //     jsonData,
  //     { encoding: FileSystem.EncodingType.UTF8 }
  //   ).then(() => {
  //     console.log("File written successfully!");
  //   });
  // } catch (error) {
  //   console.log("Write Error: ", error);
  // }

  //   // 4. Read the contents of the file:
  //   try {
  //     const stringData =
  //       await FileSystem.StorageAccessFramework.readAsStringAsync(
  //         recoveryContext.fileUri!
  //       );

  //     const fileContents = JSON.parse(stringData);
  //     console.log("fileContents: ", fileContents);

  //     console.log("File Contents: ", fileContents);
  //   } catch (error) {
  //     console.log("Read Error: ", error);
  //   }
  // }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>ADMINISTRATION:</Text>

      <Pressable
        style={[styles.submitBtn, { marginBottom: 20 }]}
        onPress={() => configure()}
      >
        <Text style={styles.btnText}>Configure Recovery</Text>
      </Pressable>

      {/* <Pressable style={styles.submitBtn} onPress={() => handleSave()}>
        <Text style={styles.btnText}>Save Menu</Text>
      </Pressable> */}

      <View style={{ marginTop: 20 }}>
        <View
          style={{
            width: 140,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Directory Exists: </Text>
          <Text>{dirResult}</Text>
        </View>
        <View
          style={{
            width: 140,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>File Exists: </Text>
          <Text>{fileResult}</Text>
        </View>
      </View>
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
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#060a31",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
