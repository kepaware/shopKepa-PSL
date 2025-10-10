import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

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
          CREATE TABLE IF NOT EXISTS shopusers (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, pin INTEGER, email TEXT, password TEXT, greeting TEXT);
          CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, label TEXT, category TEXT, list BOOL, user_id INTEGER);
        `
    );

    console.log("DB shopkepa.db created/exists");
  } catch (error) {
    console.error("Error creating database: ", error);
    createDBError = true;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <SQLiteProvider databaseName="shopkepa.db" onInit={createDBIfNeeded}>
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
        </SQLiteProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
