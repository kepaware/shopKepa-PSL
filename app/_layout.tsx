import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Alert } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const createDBIfNeeded = async (db: SQLiteDatabase) => {
  let response: any;
  let createDBError: boolean = false;

  try {
    response = await db.execAsync(
      `
          CREATE TABLE IF NOT EXISTS shopusers (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, greeting TEXT);
          CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT, category TEXT, list BOOL, user_id INTEGER);
        `
    );
  } catch (error) {
    Alert.alert(`Error creating database:  ${error}`);
    createDBError = true;
  }
};

export default function App() {
  return (
    <SQLiteProvider databaseName="shopkepa.db" onInit={createDBIfNeeded}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack>
            <Stack.Screen
              name="(protected)"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />

            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />

            <Stack.Screen
              name="register"
              options={{
                headerShown: false,
                animation: "none",
              }}
            />
          </Stack>
        </QueryClientProvider>
      </AuthProvider>
    </SQLiteProvider>
  );
}
