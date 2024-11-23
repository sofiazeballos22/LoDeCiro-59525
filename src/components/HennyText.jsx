import { StyleSheet, Text, View } from "react-native";

const HennyText = ({ children, style }) => {
  return <Text style={{ ...styles.textHenny, ...style }}>{children}</Text>;
};

export default HennyText;

const styles = StyleSheet.create({
  HennyText: {
    fontFamily: "Henny",
  },
});
