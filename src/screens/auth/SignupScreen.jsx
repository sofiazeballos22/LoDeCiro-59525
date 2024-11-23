import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../global/colors";
import { useState, useEffect } from "react";
import { useSignupMutation } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { setUser } from "../../feactures/auth/authSlice";
import { validationSchema } from "../../validations/validationSchema";

const textInputWidth = Dimensions.get("window").width * 0.7;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log("Base URL:", process.env.EXPO_PUBLIC_BASE_AUTH_URL);
  console.log("API Key:", process.env.EXPO_PUBLIC_API_KEY);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [genericValidationError, setGenericValidationError] = useState("");
  const [errorAddUser, setErrorAddUser] = useState(false);

  const [triggerSignup, result] = useSignupMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (result.status === "rejected") {
      console.log(
        "Error al agregar el usuario:",
        JSON.stringify(result.error, null, 2)
      );
    } else if (result.status === "fulfilled") {
      console.log("Usuario agregado con éxito");
      dispatch(setUser(result.data));
    }
  }, [result]);

  const onsubmit = () => {
    try {
      validationSchema.validateSync({ email, password, confirmPassword });
      setErrorEmail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      triggerSignup({ email, password });
    } catch (error) {
      switch (error.path) {
        case "email":
          console.log(error.message);
          setErrorEmail(error.message);
          break;
        case "password":
          console.log(error.message);
          setErrorPassword(error.message);
          break;
        case "confirmPassword":
          console.log(error.message);
          setErrorConfirmPassword(error.message);
          break;
        default:
          setGenericValidationError(error.message);
          break;
      }
    }
  };

  return (
    <LinearGradient
    colors={["#00465c", "#00aae0", "#007499"]}
    locations={[0, 0.5, 1]}
    start={{ x: 0, y: 0 }} // esquina superior izquierda
    end={{ x: 1, y: 1 }} // esquina inferior derecha
    style={styles.gradient}
    >
      <Text style={styles.title}>Lo de Ciro</Text>
      <Text style={styles.subTitle}>Registrate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#EBEBEB"
          placeholder="Email"
          style={styles.textInput}
        />
        {errorEmail && !errorPassword && (
          <Text style={styles.error}>{errorEmail}</Text>
        )}
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#EBEBEB"
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor="#EBEBEB"
          placeholder="Repetir password"
          style={styles.textInput}
          secureTextEntry
        />
        {errorConfirmPassword && (
          <Text style={styles.error}>{errorConfirmPassword}</Text>
        )}
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              ...styles.whiteText,
              ...styles.underLineText,
            }}
          >
            Iniciar sesión
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Crear cuenta</Text>
      </Pressable>
      {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
      <View style={styles.guestOptionContainer}>
        <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
        <Pressable
          onPress={() =>
            dispatch(setUser({ email: "demo@ciro.com", token: "demo" }))
          }
        >
          <Text style={{ ...styles.whiteText, ...styles.strongText }}>
            Ingresa como invitado
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.naranjaPastel,
    fontFamily: "Henny",
    fontSize: 50,
  },
  subTitle: {
    fontFamily: "Henny",
    fontSize: 18,
    color: colors.beigeClaro,
    fontWeight: "700",
    letterSpacing: 3,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: "center",
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.azulMarino,
    width: textInputWidth,
    color: colors.beigeClaro,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
  },
  whiteText: {
    color: colors.beigeClaro,
    fontSize: 16,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  strongText: {
    fontWeight: "900",
    fontSize: 16,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.azulMarino,
    borderRadius: 16,
    marginTop: 32,
  },
  btnText: {
    color: colors.naranjaPastel,
    fontSize: 16,
    fontWeight: "700",
  },
  guestOptionContainer: {
    alignItems: "center",
    marginTop: 64,
  },
});
