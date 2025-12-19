import { UserAPI } from "@/api/UserAPI";
import { defaultStyles } from "@/constants/Style";
import { useWarmUpBrowser } from "@/hooks/useWarnUpBrowser";
import { saveValueSecureStore } from "@/store/SecureStore";
import { User, useUserStore } from "@/store/useUserStore";
// import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const Signup = () => {
  useWarmUpBrowser();

  const updateUser = useUserStore((state) => state.updateUser);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    reTypePassword: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    reTypePassword: "",
    phone_number: "",
  });
  const [signupError, setSigupError] = useState("");
  const router = useRouter();
  // const { startOAuthFlow } = useOAuth({
  //   strategy: "oauth_facebook",
  // });

  const handleTextInputChange = (text: string, inputType: string) => {
    setData((prevData) => ({
      ...prevData,
      [inputType]: text,
    }));
    // Clear previous error message
    setErrors((prevErrors) => ({
      ...prevErrors,
      [inputType]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    if (!data.name.trim()) {
      updatedErrors.name = "Full name is required";
      isValid = false;
    }

    if (!data.email.trim()) {
      updatedErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(data.email)) {
      updatedErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!data.phone_number.trim()) {
      updatedErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!isValidPhoneNumber(data.phone_number)) {
      updatedErrors.phone_number = "Invalid phone number format";
      isValid = false;
    }

    if (!/^\d{6}$/.test(data.password)) {
      updatedErrors.password = "Password must be 5 numeric characters";
      isValid = false;
    }

    if (data.password !== data.reTypePassword) {
      updatedErrors.reTypePassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const res = await UserAPI.register(
        data.email,
        data.name,
        data.password,
        data.phone_number
      );
      if (res.status === 201) {
        const { _id, email, name, phone_number, created_at } = res?.data?.data;
        const user = {
          _id,
          username: name,
          email,
          phoneNumber: phone_number,
          isLogin: true,
          created_at,
          token: res.data.token,
        } as User;
        ToastAndroid.showWithGravity(
          "Sign up successfully",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        updateUser(user);
        saveValueSecureStore("email", user.email);
        saveValueSecureStore("password", data.password);
        router.push("/(tabs)/profile");
      } else {
        console.log(res);
      }
    } catch (err) {
      setSigupError("Email is registed, try anther one!");
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Full Name"
        style={[defaultStyles.inputField, { marginBottom: 5 }]}
        onChangeText={(text) => handleTextInputChange(text, "name")}
      />
      {errors.name ? <Text style={style.errorText}>{errors.name}</Text> : null}

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 5 }]}
        onChangeText={(text) => handleTextInputChange(text, "email")}
      />
      {errors.email ? (
        <Text style={style.errorText}>{errors.email}</Text>
      ) : null}

      <TextInput
        autoCapitalize="none"
        placeholder="Phone"
        style={[defaultStyles.inputField, { marginBottom: 5 }]}
        onChangeText={(text) => handleTextInputChange(text, "phone_number")}
      />
      {errors.phone_number ? (
        <Text style={style.errorText}>{errors.phone_number}</Text>
      ) : null}

      <TextInput
        autoCapitalize="none"
        placeholder="Password is 6 numeric"
        keyboardType="numeric"
        maxLength={6}
        style={[defaultStyles.inputField, { marginBottom: 5 }]}
        secureTextEntry={true}
        onChangeText={(text) => handleTextInputChange(text, "password")}
      />
      {errors.password ? (
        <Text style={style.errorText}>{errors.password}</Text>
      ) : null}

      <TextInput
        autoCapitalize="none"
        placeholder="Retype Password"
        style={[defaultStyles.inputField, { marginBottom: 5 }]}
        maxLength={6}
        keyboardType="numeric"
        secureTextEntry={true}
        onChangeText={(text) => handleTextInputChange(text, "reTypePassword")}
      />
      {errors.reTypePassword ? (
        <Text style={style.errorText}>{errors.reTypePassword}</Text>
      ) : null}

      {signupError ? <Text style={style.errorText}>{signupError}</Text> : null}

      <TouchableOpacity style={defaultStyles.btn} onPress={handleSignUp}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
    padding: 26,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
});

export default Signup;
