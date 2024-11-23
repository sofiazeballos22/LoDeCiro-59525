import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors"
import HennyText from '../components/HennyText'


const Header = ({subtitle} ) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Lo de Ciro</Text>
      <HennyText style={styles.subtitle}> {subtitle}           
      </HennyText>
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    width: "100%",
    backgroundColor: colors.azulMarino,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50, 
    borderBottomRightRadius: 50,
    overflow: "hidden",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 50,
    color: colors.naranjaPastel,
    textAlign: "center",
    fontFamily: 'Henny',
  },
  subtitle: {
    color: colors.beigeClaro,
    fontSize: 18,
  }

})