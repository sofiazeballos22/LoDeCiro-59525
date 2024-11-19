import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors"


const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Lo de Ciro</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    width: "100%",
    backgroundColor: colors.beigeOscuro,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50, 
    borderBottomRightRadius: 50,
    overflow: "hidden"
  },
  headerTitle: {
    fontSize: 50,
    color: colors.azulMarino,
    textAlign: "center",
    fontFamily: 'Henny',
  }
})