import { SetStateAction } from "react";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Alert,
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function PasswordModal({ showModal, setShowModal }: ModalProps) {
  const insets = useSafeAreaInsets();
  const [myUsername, setMyUsername] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [error, setError] = useState("");
  const { isPending, user } = useDBFunctions().useGetUser();
  let btnText = myPassword !== "" ? myPassword : "Retrieve Password";
  // let btnTextColor = myPassword !== "" ? "##f3ac7d" : "#fff";
  let btnTextColor = "#fff";

  function clearFields() {
    setError("");
    setMyEmail("");
    setMyPassword("");
    setMyUsername("");
  }

  function retrievePassword(id: number) {
    console.log("User: ", user);
    const { email, password, username } = user!;
    const checkEmail = email === myEmail ? true : false;
    const checkUsername = username === myUsername ? true : false;

    if (checkEmail && checkUsername) {
      setMyPassword(password!);
    } else {
      setError("Credential check failed");
    }
  }

  if (isPending)
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text>Loading data...</Text>
      </View>
    );

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.heading}>Forgot My Password:</Text>

        <View style={styles.inputSection}>
          <Text style={styles.inputTitle}>Username:</Text>
          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            style={styles.textInput}
            placeholder="Enter your username..."
            defaultValue={myUsername}
            onChangeText={(newText) => setMyUsername(newText)}
            autoCapitalize="none"
          />

          <Text style={styles.inputTitle}>Email:</Text>
          <TextInput
            showSoftInputOnFocus={true}
            style={styles.textInput}
            placeholder="Enter your email address..."
            defaultValue={myEmail}
            onChangeText={(newText) => setMyEmail(newText)}
            autoCapitalize="none"
          />

          {error !== "" && (
            <Text style={{ color: "red", fontWeight: 600 }}>{error}</Text>
          )}

          <View style={styles.submitSection}>
            <Pressable
              onPress={() => retrievePassword(user?.id!)}
              style={styles.submitBtn}
            >
              <Text style={[styles.btnText, { color: `${btnTextColor}` }]}>
                {btnText}
              </Text>
            </Pressable>
          </View>

          <View style={styles.submitSection}>
            <Pressable
              onPress={() => {
                clearFields();
                setShowModal(false);
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "blue",
                }}
              >
                Return to Login Page
              </Text>
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
    fontWeight: 500,
    color: "black",
    marginBottom: 8,
    marginLeft: 2,
  },
  textInput: {
    width: "100%",
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    fontSize: 16,
    color: "#000",
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
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: "#060a31",
  },
  btnText: {
    fontSize: 16,
    fontWeight: 600,
  },
});
