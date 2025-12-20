import ProgressRow from "@/components/ProgressRow";
import { Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useContext, useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import * as FileSystem from "expo-file-system/legacy";
import { MenuContext } from "@/utils/menuContext";
import { format } from "date-fns";

export default function Backup() {
  const { items } = useDBFunctions().useFetchAll();
  const menuContext = useContext(MenuContext);

  const dateSaved =
    menuContext.savedDate === null ? "Not yet saved" : menuContext.savedDate;

  //Progress Indicators:
  const [access, setAccess] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
  const [written, setWritten] = useState<boolean>(false);

  const btn1Title = written ? "Save Complete" : "Save Menu";
  const btn1Color = written ? "#6dc491" : "#060a31";

  async function createFile(directory: string) {
    let file: string | null = null;

    try {
      const fileInfo =
        await FileSystem.StorageAccessFramework.readDirectoryAsync(
          directory
        ).then((fileInfo) => {
          //1. Check info array for 'menu.txt' entry:
          fileInfo.forEach((e) => {
            if (e.endsWith("menu.txt")) {
              menuContext.setUri(e);
              file = e;
            }
          });
        });
    } catch (error) {
      console.log("fileCheckError: ", error);
    }

    if (file !== null) {
      await FileSystem.StorageAccessFramework.deleteAsync(file).then(
        async () => {
          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              directory,
              "menu",
              "text/plain"
            ).then((fileUri) => {
              setCreated(true);
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
        setCreated(true);
        return fileUri;
      });
    }
    return file;
  }

  async function writeFile(fileUri: string) {
    const jsonData = JSON.stringify(items);
    const saveDate = format(new Date(), "dd/MM/yy hh:mm a");

    try {
      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        fileUri,
        jsonData,
        { encoding: FileSystem.EncodingType.UTF8 }
      ).then(() => {
        setWritten(true);
        menuContext.setSaved(saveDate);
      });
    } catch (error) {
      Alert.alert("Error writing to file!");
      console.log("Write Error: ", error);
    }
  }

  async function backup() {
    // 1. Request permissions for the parent directory:
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    // 2. Check permission was granted:
    if (!permissions.granted) {
      Alert.alert("Permissions not granted!");
      return;
    } else {
      setAccess(true);

      const { directoryUri } = permissions;

      // 3. Create empty menu file:
      const fileUri = await createFile(directoryUri).then(async (fileUri) => {
        // 4. Write Menu to File:
        if (fileUri !== null) {
          await writeFile(fileUri);
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>SAVE MENU TO STORAGE:</Text>

      <View style={{ marginTop: 10, marginBottom: 20 }}>
        {access && <ProgressRow description="Permissions granted:" />}
        {created && <ProgressRow description="Recovery File Created:" />}
        {written && <ProgressRow description="Menu Items Written to File:" />}
      </View>

      <Pressable
        style={[
          styles.submitBtn,
          { marginBottom: 10, backgroundColor: `${btn1Color}` },
        ]}
        disabled={written}
        onPress={async () => await backup()}
      >
        <Text style={styles.btnText}>{btn1Title}</Text>
      </Pressable>

      <Text style={styles.date}>LAST SAVED: {dateSaved}</Text>
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
    color: "#333",
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
  date: {
    color: "#333",
    fontSize: 14,
  },
});
