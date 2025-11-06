import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Alert } from "react-native";
import { AuthContext } from "@/utils/authContext";
import { HapticTab } from "@/components/ui/HapticTab";
import { MenuProvider } from "@/utils/menuContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function TabLayout() {
  const authState = useContext(AuthContext);
  const db = useSQLiteContext();

  const checkIfUserSet = async () => {
    try {
      const results = await db
        .getAllAsync("SELECT * FROM shopusers")
        .then((results: any) => {
          if (results.length >= 1) {
            //There is an entry in the users table:
            console.log("A user is registered");
            return;
          } else {
            //Specify that user needs to register:
            authState.setRegister();
            console.log("User needs to register");
          }
        });
    } catch (error) {
      Alert.alert("User check failed");
      console.log("User check failed: ", error);
    }
  };

  useEffect(() => {
    checkIfUserSet();
  });

  if (!authState.isReady) {
    return null;
  }

  //If not loggged in and is Registered:
  if (!authState.isLoggedIn && !authState.isRegister) {
    return <Redirect href="/login" />;
  }

  //If not loggged in and isn't registered:
  if (!authState.isLoggedIn && authState.isRegister) {
    return <Redirect href="/register" />;
  }

  return (
    <MenuProvider>
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
          name="recovery"
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
    </MenuProvider>
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
