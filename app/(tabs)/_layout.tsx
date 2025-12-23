import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
				tabBarLabelStyle: {
					fontFamily: "mon-sb",
				},
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: "Khám phá",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='search-outline'
							color={color}
							size={size}
						/>
					),
				}}
			></Tabs.Screen>

			<Tabs.Screen
				name='wishlists'
				options={{
					tabBarLabel: "Yêu thích",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='heart-outline'
							color={color}
							size={size}
						/>
					),
				}}
			></Tabs.Screen>

			<Tabs.Screen
				name='trips'
				options={{
					tabBarLabel: "Chuyến đi",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='sparkles-outline'
							color={color}
							size={size}
						/>
					),
				}}
			></Tabs.Screen>

			<Tabs.Screen
				name='inbox'
				options={{
					tabBarLabel: "Inbox",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='chatbubble-outline'
							color={color}
							size={size}
						/>
					),
				}}
			></Tabs.Screen>

			<Tabs.Screen
				name='profile'
				options={{
					tabBarLabel: "Cá nhân",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='person-outline'
							color={color}
							size={size}
						/>
					),
				}}
			></Tabs.Screen>
		</Tabs>
	)
}

export default Layout
