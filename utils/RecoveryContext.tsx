import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

type RecoveryState = {
  fileExists: boolean;
  fileUri: string | null;
  dirUri: string | null;
  setUri: (value: string) => void;
  setDir: (value: string) => void;
  setExists: (value: boolean) => void;
};

const fileStorageKey = "file-key";
const dirStorageKey = "dir-key";
const uriStorageKey = "uri-key";

export const RecoveryContext = createContext<RecoveryState>({
  fileExists: false,
  dirUri: null,
  fileUri: null,
  setUri: () => {},
  setDir: () => {},
  setExists: () => {},
});

export function RecoveryProvider({ children }: PropsWithChildren) {
  const [fileExists, setFileExists] = useState(false);
  const [dirUri, setDirUri] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);

  const storeFileState = async (newState: { fileExists: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(fileStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const storeDirUriState = async (newState: { dirUri: string }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(dirStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const storeUriState = async (newState: { fileUri: string }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(uriStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const setExists = (value: boolean) => {
    setFileExists(value);
    storeFileState({ fileExists: value });
  };

  const setDir = (value: string) => {
    setDirUri(value);
    storeDirUriState({ dirUri: value });
  };

  const setUri = (value: string) => {
    setFileUri(value);
    storeUriState({ fileUri: value });
  };

  useEffect(() => {
    const getFileExistStateFromStorage = async () => {
      try {
        const existValue = await AsyncStorage.getItem(fileStorageKey);

        if (existValue !== null) {
          const filePresent = JSON.parse(existValue!);
          setFileExists(filePresent.fileExists);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
    };

    getFileExistStateFromStorage();

    const getDirUriFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(dirStorageKey);

        if (value !== null) {
          const URI = JSON.parse(value);
          setDirUri(URI.dirUri);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
    };

    getDirUriFromStorage();

    const getFileUriFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(uriStorageKey);

        if (value !== null) {
          const URI = JSON.parse(value);
          setFileUri(URI.fileUri);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
    };

    getFileUriFromStorage();
  }, []);

  return (
    <RecoveryContext.Provider
      value={{
        fileExists,
        fileUri,
        dirUri,
        setExists,
        setDir,
        setUri,
      }}
    >
      {children}
    </RecoveryContext.Provider>
  );
}
