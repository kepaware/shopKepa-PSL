import AccountModal from "@/components/modals/AccountModal";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDBFunctions } from "@/lib/DBUSE";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";

type User = {
  id: string;
  email: string;
  username: string;
};

export default function Account() {
  const authContext = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const { isPending, user } = useDBFunctions().useGetUser();
  const [showModal, setShowModal] = useState(false);

  async function signOut() {
    authContext.logOut();
  }

  if (isPending) return <Text>Loading...</Text>;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>Profile:</Text>

      <View style={styles.detailSection}>
        <Text style={styles.rowTitle}>Email:</Text>
        <Text style={styles.rowValue}>{user?.email}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.rowTitle}>Username:</Text>
        <Text style={styles.rowValue}>{user?.username}</Text>
      </View>

      <Pressable style={styles.changeBtn} onPress={() => setShowModal(true)}>
        <Text style={styles.changeBtnText}>Change Username</Text>
      </Pressable>

      <Pressable style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutBtnText}>Sign Out</Text>
      </Pressable>

      <AccountModal
        id={user?.id!}
        username={user?.username!}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 700,
    color: "#5a0a0e",
  },
  detailSection: {
    marginVertical: 8,
    paddingLeft: 10,
    paddingVertical: 6,
    width: "74%",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 700,
    // backgroundColor: "#555",
  },
  rowValue: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
    // backgroundColor: "#777",
  },
  changeBtn: {
    marginTop: 30,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  logoutBtn: {
    marginTop: 30,
    borderRadius: 6,
    backgroundColor: "#5a0a0e",
  },
  changeBtnText: {
    fontSize: 16,
    fontWeight: 600,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: "#cfd6e7",
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: 600,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: "#fff",
  },
});
