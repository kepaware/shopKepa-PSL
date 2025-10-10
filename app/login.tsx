import PasswordModal from "@/components/modals/PasswordModal";
import { AuthContext } from "@/utils/authContext";
import { useContext, useState, useCallback } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";

import {
  Alert,
  AppState,
  Pressable,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

export default function Login() {
  const authContext = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const { isPending, user } = useDBFunctions().useGetUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);

  const inputMargins = emailError ? 8 : 20;

  const debounceEmail = useDebouncedCallback((newText) => {
    validateEmail(newText);
  }, 1000);

  const debouncePassword = useDebouncedCallback((newText) => {
    validatePassword(newText);
  }, 1000);

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

    if (!valid) {
      setPwError("Must be at least 8 characters");
    } else {
      setPassword(newText);
      setPwError(null);
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
          autoFocus={true}
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
          <Pressable onPress={() => signInWithEmail()} style={styles.submitBtn}>
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
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
