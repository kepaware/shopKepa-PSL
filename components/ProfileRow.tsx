import { Alert, Text, View, StyleSheet, Pressable } from "react-native";
import { deleteUserItems } from "@/lib/SBAPI";

type Props = {
  profile: {
    id: string;
    username: string;
  };
};

export default function ProfileRow({ profile }: Props) {
  const adminID = "4b772b40-5187-497d-b8de-2a6f1df8fdd7";
  const isAdmin = profile.id === adminID ? true : false;
  const btnColor = isAdmin ? "#777" : "#88150d";
  const textColor = isAdmin ? "#777" : "#000";

  function handleDeleteMenu(id: string) {
    deleteUserItems(id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.usernameSection}>
        <Text style={[styles.nameText, { color: textColor }]}>
          {profile.username}
        </Text>
      </View>

      <Pressable
        disabled={isAdmin ? true : false}
        style={[styles.pressable, { backgroundColor: btnColor }]}
        onPress={() => handleDeleteMenu(profile.id)}
      >
        <Text style={styles.pressableText}>Delete Menu</Text>
      </Pressable>
    </View>
  );
}
// </View>

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#eee",
  },
  usernameSection: {
    width: "48%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  nameText: {
    fontSize: 16,
    fontWeight: 600,
  },
  pressable: {
    width: "30%",
    marginTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
  },
  pressableText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
