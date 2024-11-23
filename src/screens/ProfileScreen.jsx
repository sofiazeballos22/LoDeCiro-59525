import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { colors } from "../global/colors";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "../components/CameraIcon";
import { setProfilePicture } from "../feactures/auth/authSlice";
import React from "react";
import { usePutProfilePictureMutation } from "../services/userService";

const ProfileScreen = () => {
  const user = useSelector((state) => state.authReducer.value.email);
  const image = useSelector((state) => state.authReducer.value.profilePicture);
  const localId = useSelector((state) => state.authReducer.value.localId);
  const dispatch = useDispatch();
 
  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    const permissionOk = await verifyCameraPermissions();
    if (permissionOk) {

      let result = await ImagePicker.launchCameraAsync({
   
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        dispatch(
          setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
        triggerPutProfilePicture({
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          localId,
        });
      }
    } else {
      
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 32,
    alignItems: "center",
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 250,
    backgroundColor: colors.beigeOscuro,
    justifyContent: "center",
    alignItems: "center",
  },
  textProfilePlaceHolder: {
    color: colors.azulMarino,
    fontSize: 48,
    marginBottom: 14,
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
    color: colors.azulMarino
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
  },
});
