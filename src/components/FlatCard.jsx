import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../global/colors"


const flatCard = ({ children, style }) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
        {children}
    </View>
  )
}

export default flatCard

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.azulMarino,
    shadowColor: colors.celesteVivo,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 3 },
    elevation: 60,
    borderRadius: 20,

  }
})