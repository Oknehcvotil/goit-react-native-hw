import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";

import { Octicons } from "@expo/vector-icons";

import Bg from "../images/background.png";

const RegistrationScreen = () => {
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);

      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const keyboardIsHidden = () => {
    Keyboard.dismiss();
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`All fields must be filled in!`);
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(`Invalid email address!`);
      return;
    }

    Alert.alert(`${login}, successfully registered!`);
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.container}>
          <ImageBackground style={styles.backgroundImg} source={Bg}>
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrap,
                  width: phoneWidth,

                  marginTop: phoneWidth > 400 ? 200 : 300,
                }}
              >
                <View
                  style={{
                    ...styles.imageWrap,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addBtn,
                    right: phoneWidth / 2 - 70,
                  }}
                >
                  <Octicons name="plus-circle" size={25} color="#FF6C00" />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Реєстрація</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusLogin ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusLogin(true)}
                    onBlur={() => setFocusLogin(false)}
                    placeholder="Логін"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    value={login}
                    onChangeText={setLogin}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    placeholder="Адреса електронної пошти"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    value={password}
                    onChangeText={setPassword}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Зареєстуватися</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.bottomLink}>Вже є акаунт? Увійти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  containerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 550,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  imageWrap: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 25,
    height: 25,
  },

  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },

  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    color: "#212121",
  },

  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 253,
    paddingRight: 16,
  },

  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },

  button: {
    height: 50,
    marginTop: 40,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
  },

  bottomLink: {
    marginTop: 15,
    marginBottom: 100,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
});
