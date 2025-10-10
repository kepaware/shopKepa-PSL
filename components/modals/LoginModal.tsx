import { SetStateAction } from "react";
import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Alert,
  AppState,
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

type Props = {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<SetStateAction<boolean>>;
};

// AppState.addEventListener("change", (state) => {
//   if (state === "active") {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });

export default function LoginModal({
  showLoginModal,
  setShowLoginModal,
}: Props) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });
    // if (error) Alert.alert(error.message);
    setLoading(false);
    setShowLoginModal(false);
  }

  if (loading) return <Text>Processing your submission...</Text>;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showLoginModal}
      onRequestClose={() => setShowLoginModal(false)}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.heading}>Sign In to your Account:</Text>

        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            style={styles.textInput}
            placeholder="Email Address"
            defaultValue={email}
            onChangeText={(newText) => setEmail(newText)}
            autoCapitalize="none"
          />
          {/* </View>
        
                <View style={styles.inputSection}> */}
          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            defaultValue={password}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(newText) => setPassword(newText)}
          />

          <View style={styles.submitSection}>
            <Pressable
              onPress={() => signInWithEmail()}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Submit Credentials</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
    marginVertical: 20,
  },
  inputSection: {
    width: "70%",
    flex: 1,
    justifyContent: "flex-start",
    // marginBottom: 20,
    // backgroundColor: "#ddd",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: "black",
    marginBottom: 8,
    marginLeft: 2,
  },
  textInput: {
    width: "100%",
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
  },
  submitSection: {
    width: "100%",
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    // width: 160,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "darkblue",
    // marginBottom: 60,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
