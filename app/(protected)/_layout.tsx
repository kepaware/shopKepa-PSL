import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HapticTab } from "@/components/ui/HapticTab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "@/utils/authContext";
import { useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function TabLayout() {
  const authState = useContext(AuthContext);
  const db = useSQLiteContext();

  const checkIfUserSet = async () => {
    const results = await db
      .getAllAsync("SELECT * FROM shopusers")
      .then((results: any) => {
        if (results.length >= 1) {
          return;
        } else {
          authState.setRegister();
        }
      });
  };

  useEffect(() => {
    checkIfUserSet();
  });

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn && !authState.isRegister) {
    return <Redirect href="/login" />;
  }

  if (!authState.isLoggedIn && authState.isRegister) {
    return <Redirect href="/register" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarButton: HapticTab,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            animation: "fade",
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            headerShown: false,
            tabBarLabel: "List",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-ul" color={color} size={22} />
            ),
            animation: "fade",
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            headerShown: false,
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="map" color={color} size={size} />
            ),
            animation: "fade",
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            headerShown: false,
            href: null,
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            href: null,
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
