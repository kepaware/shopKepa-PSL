import ItemModal from "@/components/modals/ItemModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDBFunctions } from "@/lib/DBUSE";
import { Link } from "expo-router";
import { useState } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isPending: isCollecting, user } = useDBFunctions().useGetUser();
  const { isPending, items } = useDBFunctions().useFetchAll();
  const { isFetching, listItems } = useDBFunctions().useFetchListItems();
  const [showItemModal, setShowItemModal] = useState(false);

  if (isPending || isFetching || isCollecting)
    return (
      <SafeAreaView style={[styles.container]}>
        <Text style={{ marginTop: 50, fontSize: 16, fontWeight: 600 }}>
          Loading data...
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[styles.container]}>
      <Link style={{ position: "absolute", bottom: 220 }} href={"./account"}>
        <Ionicons name="person" color="#3854f0" size={40} />
      </Link>

      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.heading}>{user?.username ? user.username : ""}</Text>

      <View style={styles.stats}>
        <View style={{ marginTop: 30, flexDirection: "row", gap: 14 }}>
          <View style={{ width: 60, justifyContent: "flex-start" }}>
            <Text style={styles.statsText}>Menu:</Text>
          </View>

          <View style={{ width: 40, justifyContent: "flex-end" }}>
            <Text style={styles.statsText}>{items!.length}</Text>
          </View>
        </View>

        <View style={{ marginTop: 10, flexDirection: "row", gap: 14 }}>
          <View style={{ width: 60, justifyContent: "flex-start" }}>
            <Text style={styles.statsText}>List:</Text>
          </View>

          <View style={{ width: 40, justifyContent: "flex-end" }}>
            <Text style={styles.statsText}>{listItems!.length}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.link} onPress={() => setShowItemModal(true)}>
        <Ionicons name="add-circle" color="black" size={50} />
      </Pressable>

      <View style={styles.btmSection}>
        <Text style={styles.copyright}>&copy;kepaWare 2025 </Text>
      </View>

      {/* --------------------- Modals: --------------------  */}

      <ItemModal
        showItemModal={showItemModal}
        setShowItemModal={setShowItemModal}
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
  stats: {
    flex: 1,
    position: "absolute",
    bottom: 340,
  },
  statsText: {
    fontSize: 20,
    fontWeight: 700,
  },
  link: {
    position: "absolute",
    bottom: 110,
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
  copyright: {
    fontSize: 16,
    fontWeight: 600,
    color: "#999",
  },
});
