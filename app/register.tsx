import { useContext, useState, KeyboardEvent } from "react";
import { AuthContext } from "@/utils/authContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import * as SecureStore from "expo-secure-store";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

export default function Register() {
  const db = useSQLiteContext();
  const authContext = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [myPin, setMyPin] = useState("");
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [pinError, setPinError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const reset = () => {
    setName("");
    setMyPin("");
    setNewEmail("");
    setNewPassword("");
    setNameError("");
    setPinError("");
    setEmailError("");
    setPasswordError("");
    setError(false);
  };

  function validateName() {
    const regex = /^[a-zA-Z0-9 -]+$/;
    const validLength = newPassword.length >= 2 ? true : false;

    let isError = false;

    Array.from(name).forEach((char) => {
      const result = regex.test(char);

      if (!result) {
        isError = true;
      }
    });

    if (isError) {
      setNameError("Name contains invalid characters!");
      setError(true);
      return false;
    } else if (!isError && !validLength) {
      setNameError("Name must be 2 characters or more");
      setError(true);
      return false;
    } else {
      return true;
    }
  }

  function validatePIN() {
    const regex = /^[Z0-9]+$/;
    const validLength = myPin.length === 4 ? true : false;

    let isError = false;

    Array.from(myPin).forEach((char) => {
      const result = regex.test(char);

      if (!result) {
        isError = true;
      }
    });

    if (isError || !validLength) {
      setPinError("PIN must be 4 numerals!");
      setError(true);
      return false;
    } else {
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newEmail)) {
      setEmailError("Valid email address required!");
      setError(true);
      return false;
    } else {
      return true;
    }
  }

  function validatePassword() {
    if (newPassword.length >= 8) {
      return true;
    } else {
      setPasswordError("Must be 8 characters or more!");
      setError(true);
      return false;
    }
  }

  async function savePIN(value: string) {
    try {
      await SecureStore.setItemAsync("shopKepaPIN", value);
    } catch (error) {
      Alert.alert("Error Saving PIN!");
    }
  }

  async function savePW(value: string) {
    try {
      await SecureStore.setItemAsync("shopKepaPW", value);
    } catch (error) {
      Alert.alert("Error Saving Password!");
    }
  }

  async function signUpWithEmail() {
    const validName = validateName();
    const validPIN = validatePIN();
    const validEmail = validateEmail();
    const validPassword = validatePassword();

    if (validName && validPIN && validEmail && validPassword) {
      try {
        await db.runAsync(
          "INSERT INTO shopusers (username, email) VALUES (?, ?)",
          name,
          newEmail
        );

        savePIN(myPin);
        savePW(newPassword);
        authContext.deRegister();
        authContext.logIn();
      } catch (error) {
        Alert.alert(`ERROR REGISTERING: ${error}`);
      }
    }
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.heading}>Register a New User:</Text>

      <View
        style={{
          width: "70%",
          flexDirection: "row",
          gap: 30,
        }}
      >
        {/* Username: */}
        <View style={[styles.inputNamePIN]}>
          <Text style={styles.inputTitle}>Display Name:</Text>
          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            style={[styles.textNameInput, { width: "100%" }]}
            placeholder="Display Name"
            defaultValue={name}
            onChangeText={(newText) => setName(newText)}
            autoCapitalize="none"
          />
        </View>

        {/* PIN: */}
        <View style={[{ flexDirection: "column", width: 56 }]}>
          <Text style={[styles.inputTitle, { paddingLeft: 12 }]}>PIN:</Text>
          <TextInput
            showSoftInputOnFocus={true}
            keyboardType="numeric"
            style={[styles.textPINInput]}
            placeholder="4-dgt"
            defaultValue={myPin}
            onChangeText={(newText) => setMyPin(newText)}
            autoCapitalize="none"
          />
        </View>
      </View>
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      {pinError && <Text style={styles.errorText}>{pinError}</Text>}

      <View style={styles.inputSection}>
        <Text style={styles.inputTitle}>Email:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          defaultValue={newEmail}
          onChangeText={(newText) => setNewEmail(newText)}
          autoCapitalize="none"
        />

        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <Text style={styles.inputTitle}>Password:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          defaultValue={newPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(newText) => setNewPassword(newText)}
        />

        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <View style={styles.submitSection}>
          {!error && (
            <Pressable
              onPress={() => signUpWithEmail()}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Register New User</Text>
            </Pressable>
          )}

          {error && (
            <Pressable
              onPress={() => reset()}
              style={[styles.submitBtn, { marginTop: 24 }]}
            >
              <Text style={styles.btnText}>Clear fields and try again!</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
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
  inputNamePIN: {
    flex: 1,
    justifyContent: "flex-start",
  },
  inputSection: {
    width: "70%",
    flex: 1,
    justifyContent: "flex-start",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: "black",
    marginBottom: 8,
    marginLeft: 2,
  },
  textNameInput: {
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
  },
  textPINInput: {
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
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
    alignItems: "center",
  },
  submitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "darkblue",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 600,
    color: "red",
    marginBottom: 10,
  },
});
