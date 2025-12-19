import Colors from "@/constants/Colors";
// import { db } from "@/firebase"
import { useUserStore } from "@/store/useUserStore";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
// import {
// 	collection,
// 	doc,
// 	onSnapshot,
// 	orderBy,
// 	query,
// 	setDoc,
// 	where,
// } from "firebase/firestore"
import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { GiftedChat } from "react-native-gifted-chat"

const DetailPage = () => {
  const navigation = useNavigation(); // Access navigation object
  const { user } = useUserStore();
  const { id: roomID } = useLocalSearchParams();
  const userID = user._id;
  const [messages, setMessages] = useState<any>([]);

  useLayoutEffect(() => {
    // console.log(roomID)
    // const collectionRef = collection(db, "chats")
    // const q = query(
    // 	collectionRef,
    // 	where("room", "==", roomID),
    // 	orderBy("createdAt", "desc")
    // )
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    // 	setMessages(
    // 		querySnapshot.docs.map((doc) => ({
    // 			_id: doc.data()._id,
    // 			createdAt: doc.data().createdAt.toDate(),
    // 			text: doc.data().text,
    // 			user: doc.data().user,
    // 		}))
    // 	)
    // })
    // return unsubscribe
  }, []);

  const onSend = useCallback(async (messages = []) => {
    // setMessages((previousMessages: any) =>
    // 	GiftedChat.append(previousMessages, messages)
    // )
    // // setMessages([...messages, ...messages]);
    // const chatsRef = collection(db, "chats")
    // const { _id, createdAt, text, user } = messages[0]
    // await setDoc(doc(chatsRef), {
    // 	_id,
    // 	createdAt,
    // 	text,
    // 	user,
    // 	room: roomID,
    // })
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <></>,
        }}
      ></Stack.Screen>
      {/* <GiftedChat
				messages={messages}
				showAvatarForEveryMessage={false}
				showUserAvatar={false}
				onSend={(messages: any) => onSend(messages)}
				messagesContainerStyle={{
					backgroundColor: "#fff",
				}}
				user={{
					_id: userID,
					avatar: "https://i.pravatar.cc/300",
				}}
			/> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  listing: {
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
});

export default DetailPage;
