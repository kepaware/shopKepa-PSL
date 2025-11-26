// import * as Font from "expo-font";
import ItemModal from "@/components/modals/ItemModal";
import MainDocsModal from "@/components/modals/MainDocsModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { useDBFunctions } from "@/lib/DBUSE";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isPending: isCollecting, user } = useDBFunctions().useGetUser();
  const { isPending, items } = useDBFunctions().useFetchAll();
  const { isFetching, listItems } = useDBFunctions().useFetchListItems();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Orbitron: require("@/assets/fonts/Orbitron-Regular.ttf"),
  });

  if (isPending || isFetching || isCollecting || !fontsLoaded)
    return (
      <SafeAreaView style={[styles.container]}>
        <Text style={{ marginTop: 50, fontSize: 16, fontWeight: 600 }}>
          Loading data...
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[styles.container]}>
      <Pressable
        style={{ position: "absolute", top: 50, left: 34 }}
        onPress={() => router.push("/recovery")}
      >
        <Ionicons name="medkit" color="black" size={30} />
      </Pressable>

      <Pressable
        style={{ position: "absolute", top: 54, right: 34 }}
        onPress={() => setShowDocsModal(true)}
      >
        <Ionicons name="book" color="black" size={30} />
      </Pressable>

      <Link style={{ position: "absolute", bottom: 180 }} href={"./account"}>
        <Ionicons name="person" color="#3854f0" size={40} />
      </Link>

      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.heading}>{user?.username ? user.username : ""}</Text>
      <Text style={styles.to}>to</Text>

      {/* Logo: */}
      <View style={styles.logoSection}>
        <Text style={styles.logoTitle}>shopKepa</Text>
        <Text style={styles.copyright}>by kepaWare</Text>
      </View>

      <View style={{ marginTop: 40, flexDirection: "row", gap: 14 }}>
        <View style={{ width: 60, justifyContent: "flex-start" }}>
          <Text style={styles.statsText}>Menu:</Text>
        </View>

        <View style={{ width: 40, justifyContent: "flex-end" }}>
          <Text style={styles.statsText}>{items!.length}</Text>
        </View>
      </View>

      <Pressable style={styles.link} onPress={() => setShowItemModal(true)}>
        <Ionicons name="add-circle" color="black" size={50} />
      </Pressable>

      {/* --------------------- Modals: --------------------  */}

      <ItemModal
        showItemModal={showItemModal}
        setShowItemModal={setShowItemModal}
      />

      <MainDocsModal
        showDocsModal={showDocsModal}
        setShowDocsModal={setShowDocsModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcome: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: 700,
    color: "black",
  },
  heading: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 700,
    color: "blue",
  },
  to: {
    marginTop: 22,
    fontSize: 22,
    fontWeight: 700,
  },
  logoSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    marginTop: 30,
    fontFamily: "Orbitron",
    fontSize: 44,
    textShadowColor: "rgba(138, 129, 129, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  copyright: {
    marginLeft: 40,
    fontSize: 16,
    fontWeight: 600,
    color: "#777",
  },
  stats: {
    flex: 1,
    position: "absolute",
    bottom: 340,
  },
  statsText: {
    fontSize: 20,
    fontWeight: 600,
  },
  link: {
    position: "absolute",
    bottom: 70,
    padding: 10,
  },
  btmSection: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginTop: 20,
  },
});
