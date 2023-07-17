import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons
              name="grid"
              size={20}
              color={focused ? "orange" : color}
            />
          ),
          title: "Публікації",
          headerTitleAlign: "center",
          headerRightContainerStyle: { paddingRight: 20 },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="gray" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <AntDesign
                name="plus"
                size={size}
                color={"#FFFFFF"}
                fillOpacity={0.8}
                fill={"#FFFFFF"}
              />
            </View>
          ),
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <AntDesign name="arrowleft" size={24} color={color} />
            </TouchableOpacity>
          ),
          title: "Створити публікацію",
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <AntDesign
                name="user"
                size={20}
                color={focused ? "orange" : color}
              />
            );
          },
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
