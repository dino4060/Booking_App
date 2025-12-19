import { UserAPI } from "@/api/UserAPI";
import CountdownTimer from "@/components/CountdownTimer";
import { defaultStyles } from "@/constants/Style";
import { useForgetPasswordStore } from "@/store/useForgetPasswordStore";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { Text, ToastAndroid } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const forgetPassword = () => {
  const [OTP, setOtp] = useState<string>("");
  const email = useForgetPasswordStore((state) => state.email);
  const handleSubmit = async () => {
    try {
      const res = await UserAPI.verityOtp(OTP, email);

      if (res?.status === "SUCCESS") {
        // call API change password
        router.push("/(information)/congatulation");
      } else {
        ToastAndroid.show(
          "Oh no! This is an invalid otp, please try again 😥😔😭🥺🥹😓 !",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {}
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          marginVertical: 70,
          marginHorizontal: 20,
        }}
      >
        <Stack.Screen
          options={{
            header: () => <></>,
          }}
        ></Stack.Screen>
        <Text
          style={{
            fontFamily: "mon-b",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          We have sent you your identification code via e-mail
        </Text>
        <TextInput
          id="id_code"
          value={OTP}
          onChangeText={setOtp}
          onSubmitEditing={handleSubmit}
          autoCapitalize="none"
          placeholder="your code"
          keyboardType="numeric"
          style={[
            defaultStyles.inputField,
            {
              marginTop: 20,
              fontFamily: "mon",
              fontSize: 20,
              textAlign: "center",
            },
          ]}
        />
        <CountdownTimer />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{ ...defaultStyles.btn, marginTop: 10 }}
        >
          <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default forgetPassword;
