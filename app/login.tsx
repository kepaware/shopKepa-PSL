import PasswordModal from "@/components/modals/PasswordModal";
import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";
import * as FileSystem from "expo-file-system/legacy";

import { Pressable, View, Text, StyleSheet, TextInput } from "react-native";

export default function Login() {
  const authContext = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const { isPending, user } = useDBFunctions().useGetUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDelBtn, setShowDelBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pinError, setPinError] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [emailLogin, setEmailLogin] = useState(false);
  const [myPin, setMyPin] = useState("");

  const inputMargins = emailError ? 8 : 20;

  const DB_NAME = "shopkepa.db";

  const debounceEmail = useDebouncedCallback((newText) => {
    validateEmail(newText);
  }, 1000);

  const debouncePassword = useDebouncedCallback((newText) => {
    validatePassword(newText);
  }, 1000);

  const handleAuthTypeChange = () => {
    setPinError(false);
    setAuthError(null);
    setEmailLogin(true);
  };

  const reset = () => {
    setMyPin("");
    setPinError(false);
    setAuthError(null);
  };

  function validateEmail(newText: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newText)) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmail(newText);
      setEmailError(null);
      return true;
    }
  }

  function validatePassword(newText: string) {
    const valid = newText.length >= 8 ? true : false;

    if (valid) {
      setPassword(newText);
      setPwError(null);
    } else {
      setPwError("Password must >= 8 characters!");
    }
  }

  //Function to confirm credentials are correct:
  function checkCredentials() {
    const trueEmail = user?.email;
    const truePassword = user?.password;
    const verifiedEmail = email === trueEmail ? true : false;
    const verifiedPassword = password === truePassword ? true : false;

    if (verifiedEmail && verifiedPassword) {
      return true;
    } else {
      return false;
    }
  }

  async function signInWithPin() {
    const regex = /^[Z0-9]+$/;
    const validLength = myPin.length === 4 ? true : false;
    const truePIN = user?.pin;
    const verifiedPin = Number(myPin) === truePIN ? true : false;
    let isValid = false;

    setLoading(true);

    Array.from(myPin).forEach((char) => {
      const result = regex.test(char);

      if (result) {
        isValid = true;
      }

      if (!result || !validLength) {
        setAuthError("Must be 4 numerals!");
        setPinError(true);
      }

      if (!verifiedPin) {
        setAuthError("Incorrect PIN!");
      }
    });

    if (isValid && validLength && verifiedPin) {
      setLoading(false);
      authContext.logIn();
    } else {
      setAuthError("Invalid PIN!");
      setPinError(true);
      setLoading(false);
    }
  }

  async function signInWithEmail() {
    setLoading(true);
    let verified = checkCredentials();

    if (verified) {
      setLoading(false);
      authContext.logIn();
    } else {
      setAuthError("Invalid Credentials!");
      setLoading(false);
    }
  }

  async function deleteDatabase() {
    const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;
    console.log("PATH: ", dbPath);

    //Check that file exists:
    try {
      const fileInfo = await FileSystem.getInfoAsync(dbPath);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(dbPath);
        console.log(`Database: ${DB_NAME} deleted successfully`);
      } else {
        console.log("File not found!");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  if (loading || isPending) {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={{ marginTop: 30, textAlign: "center", fontWeight: 600 }}>
          Verifying your credentials...
        </Text>
      </View>
    );
  }

  if (emailLogin) {
    return (
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
            autoFocus
            showSoftInputOnFocus={true}
            style={[styles.textInput, { marginBottom: inputMargins }]}
            placeholder="Email Address"
            defaultValue={email}
            autoCapitalize="none"
            onChangeText={(newText) => {
              debounceEmail(newText);
            }}
          />

          {emailError ? (
            <Text style={{ color: "red", marginBottom: 8 }}>{emailError}</Text>
          ) : null}

          <Text style={styles.inputTitle}>Password:</Text>
          <TextInput
            style={[styles.textInput, { marginBottom: inputMargins }]}
            placeholder="Password"
            defaultValue={password}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(newText) => debouncePassword(newText)}
          />

          {pwError ? (
            <Text style={{ color: "red", marginBottom: 8 }}>{pwError}</Text>
          ) : null}

          {authError && <Text style={styles.errorMessage}>{authError}!</Text>}

          <View style={styles.submitSection}>
            <Pressable
              onPress={() => signInWithEmail()}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Submit Credentials</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => setShowModal(true)}>
            <Text
              style={{
                fontSize: 18,
                color: "#537df1",
                fontWeight: 700,
                marginTop: 30,
              }}
            >
              Forgot my password...
            </Text>
          </Pressable>

          <PasswordModal showModal={showModal} setShowModal={setShowModal} />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.pinHeading}>Sign in with PIN:</Text>
        <View style={[{ flexDirection: "column", marginTop: 40 }]}>
          <Text style={[styles.inputTitle]}>4-Digit PIN:</Text>
          <TextInput
            autoFocus
            showSoftInputOnFocus={true}
            keyboardType="numeric"
            style={[styles.textPINInput]}
            defaultValue={myPin}
            secureTextEntry={true}
            onChangeText={(newText) => setMyPin(newText)}
            autoCapitalize="none"
          />

          {authError && <Text style={styles.errorMessage}>{authError}!</Text>}
        </View>

        <View style={styles.submitSection}>
          {!pinError && (
            <Pressable onPress={() => signInWithPin()} style={styles.submitBtn}>
              <Text style={styles.btnText}>Submit PIN</Text>
            </Pressable>
          )}

          {pinError && (
            <Pressable onPress={() => reset()} style={styles.submitBtn}>
              <Text style={styles.btnText}>Try again!</Text>
            </Pressable>
          )}
        </View>

        <Pressable onPress={() => handleAuthTypeChange()}>
          <Text
            style={{
              fontSize: 18,
              color: "#537df1",
              fontWeight: 700,
              marginTop: 30,
            }}
          >
            Forgot my PIN...
          </Text>
        </Pressable>

        <Pressable onPress={() => setShowDelBtn(true)}>
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              fontWeight: 700,
              marginTop: 30,
            }}
          >
            Uninstalling this application?
          </Text>
        </Pressable>

        {showDelBtn && (
          <Pressable style={styles.deleteBtn} onPress={() => deleteDatabase()}>
            <Text style={styles.btnText}>Delete Database</Text>
          </Pressable>
        )}
      </View>
    );
  }
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
  pinHeading: {
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
    marginTop: 40,
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
  textInput: {
    width: "100%",
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    // marginBottom: 20,
  },
  submitSection: {
    width: "100%",
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  textPINInput: {
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: 600,
    color: "red",
    textAlign: "center",
  },
  submitBtn: {
    // width: 160,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "darkblue",
    // marginBottom: 60,
  },
  deleteBtn: {
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "red",
    // marginBottom: 60,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
