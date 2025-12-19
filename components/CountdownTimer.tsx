import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

const CountdownTimer = () => {
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const [timerEnded, setTimerEnded] = useState(false);
  const navigation = useNavigation();
  const timerRef = useRef(null) as any;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current);
          setTimerEnded(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup function to clear the interval
  }, []);

  useEffect(() => {
    if (timerEnded) {
      navigation.goBack();
    }
  }, [timerEnded, navigation]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: "mon",
        }}
      >
        Your OTP will be expired in
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "mon",
        }}
      >
        {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
      </Text>
    </View>
  );
};

export default CountdownTimer;
