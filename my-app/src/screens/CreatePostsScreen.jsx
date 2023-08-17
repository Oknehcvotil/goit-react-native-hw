import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { Camera } from "expo-camera";

import { dataPosts } from "../data/posts";

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoLocationName, setPhotoLocationName] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [currentGeoLocation, setCurrentGeoLocation] = useState({});
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("У доступі до місцезнаходження відмовлено");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    })();
  }, []);

  const makePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPostPhoto(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  const clearData = () => {
    setPostPhoto(null);
    setPhotoName("");
    setPhotoLocationName("");
  };

  const handleSubmit = () => {
    const newPost = {
      id: dataPosts.length + 1,
      img: postPhoto, // Используйте require() для получения числового идентификатора изображения
      title: photoName,
      location: photoLocationName,
      comments: [],
      likes: 0,
    };
    console.log(newPost)
    dataPosts.unshift(newPost);
    clearData();
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {postPhoto ? (
            <Image
              source={{ uri: postPhoto }}
              style={{
                width: "95%",
                height: 240,
                borderRadius: 8,
              }}
            />
          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={makePhoto}
              >
                <FontAwesome name="camera" size={24} color="gray" />
              </TouchableOpacity>
            </Camera>
          )}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              type={"text"}
              name={"photoName"}
              value={photoName}
              onChangeText={setPhotoName}
            />
            <TextInput
              style={styles.input}
              placeholder="Місцевість..."
              type={"text"}
              name={"photoLocation"}
              value={photoLocationName}
              onChangeText={setPhotoLocationName}
            />
            <TouchableOpacity
              style={[
                styles.button,
                postPhoto
                  ? {
                      color: "#FFFFFF",
                      backgroundColor: "#FF6C00",
                    }
                  : {
                      color: "#BDBDBD",
                      backgroundColor: "#F6F6F6",
                    },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles.buttonText,
                  postPhoto
                    ? {
                        color: "#FFFFFF",
                      }
                    : {
                        color: "#BDBDBD",
                      },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
            <View style={styles.trashCont}>
              <TouchableOpacity
                style={styles.trashButton}
                activeOpacity={0.5}
                onPress={clearData}
              >
                <EvilIcons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  trashButton: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 32,
    marginBottom: 22,
  },
  camera: {
    width: "92%",
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageAddButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
  formContainer: {
    flex: 3,
  },
  button: {
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    fontWeight: "400",
  },
  input: {
    width: 340,
    height: 50,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
  trashCont: {
    alignItems: "center",
    marginTop: 120,
  },
  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },
});

export default CreatePostsScreen;
