import { UserAPI } from "@/api/UserAPI";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { useWarmUpBrowser } from "@/hooks/useWarnUpBrowser";
import { getValueSecureStore, saveValueSecureStore } from "@/store/SecureStore";
import { User, useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  useWarmUpBrowser();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const passwordRef = useRef<any>(null);

  const [emailError, setEmailError] = useState<any>(null);

  const [passwordError, setPasswordError] = useState<any>(null);

  const checkLoggedEmail = async () => {
    const email = await getValueSecureStore("email");
    if (email) router.push("/(modals)/loginWithoutEmailField");
  };

  useEffect(() => {
    checkLoggedEmail();
  }, []);

  useEffect(() => {
    if (data.password.length === 6) {
      handleLogin();
    }
  }, [data.password]);

  const updateUser = useUserStore((state) => state.updateUser);

  const handleTextInputChange = async (text: string, inputType: string) => {
    setData((pre) => ({ ...pre, [inputType]: text }));

    if (inputType === "email" && text.toLowerCase().endsWith(".com")) {
      // Focus on the password field
      passwordRef?.current?.focus();
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    // Password length check
    if (password.length !== 6) {
      setPasswordError("Password must be 6 numeric characters");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(data.email);
    const isPasswordValid = validatePassword(data.password);

    console.log(data.email, data.password);
    if (isEmailValid && isPasswordValid) {
      try {
        const res = await UserAPI.login(data.email, data.password);
        console.log(res?.data);

        if (res?.status === 200) {
          const { _id, name, email, phone_number, created_at, profile_image } =
            res?.data?.data;

          const user: User = {
            _id,
            username: name,
            email,
            phoneNumber: phone_number,
            isLogin: true,
            created_at,
            profile_image: profile_image,
            token: res.data.token,
          };
          updateUser(user);
          await saveValueSecureStore("email", user.email);
          await saveValueSecureStore("id", user._id);
          await saveValueSecureStore("token", user.token);
          await saveValueSecureStore("password", data.password);
          router.push("/(tabs)/profile");
        } else {
          setPasswordError("Incorrect email or password");
        }
      } catch (error) {
        setPasswordError("Incorrect email or password");
        setEmailError("Incorrect email or password");
        console.log(error);
      }
    }
  };

  const handelSignInWithGoogle = async () => {};

  return (
    <View style={style.container}>
      <TextInput
        id="email"
        autoCapitalize="none"
        placeholder="email"
        style={[
          defaultStyles.inputField,
          {
            marginBottom: 10,
            borderColor: emailError && "red",
          },
        ]}
        onChangeText={(e) => {
          handleTextInputChange(e, "email");
        }}
      />
      {emailError && emailError != "Incorrect email or password" && (
        <Text style={style.errorText}>{emailError}</Text>
      )}

      <TextInput
        id="password"
        secureTextEntry
        autoCapitalize="none"
        keyboardType="numeric"
        placeholder="password"
        maxLength={6}
        ref={passwordRef}
        style={[
          defaultStyles.inputField,
          {
            marginBottom: 5,
            borderColor: passwordError && "red",
          },
        ]}
        onChangeText={(e) => {
          handleTextInputChange(e, "password");
        }}
      />
      {passwordError && <Text style={style.errorText}>{passwordError}</Text>}
      <TouchableOpacity
        onPress={handleLogin}
        style={{ ...defaultStyles.btn, marginTop: 10 }}
      >
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/(modals)/inputEmail");
        }}
        style={{
          ...defaultStyles.btnCustom_1,
          marginTop: 15,
        }}
      >
        <Text style={defaultStyles.btnText}>Forget Your Password?</Text>
      </TouchableOpacity>

      <View style={style.seperatorView}>
        <View
          style={{
            borderBottomColor: "#000",
            flex: 1,

            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
        <Text style={style.seperator}>or</Text>
        <View
          style={{
            borderBottomColor: "#000",
            flex: 1,

            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            router.push("/(modals)/signup");
            // router.push("/(information)/congatulation")
          }}
          style={style.btnOutline}
        >
          <Ionicons
            name="log-in-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={style.btnOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={style.seperatorView}>
        <View
          style={{
            borderBottomColor: "#000",
            flex: 1,

            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
        <Text style={style.seperator}>Continue with</Text>
        <View
          style={{
            borderBottomColor: "#000",
            flex: 1,

            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
      </View>

      <View
        style={{
          borderRightColor: "grey",
          height: 50,
          width: "auto",
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <TouchableOpacity
          onPress={handelSignInWithGoogle}
          style={{
            height: 100,
            width: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9fafb",
            borderRadius: 30,
            borderWidth: 2,
            borderColor: "#33415530",
          }}
        >
          <Ionicons name="logo-google" size={50} color="#ef4444" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9fafb",
            borderRadius: 30,
            borderWidth: 2,
            borderColor: "#33415530",
          }}
        >
          <Ionicons name="logo-facebook" size={50} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
    padding: 26,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Login;
