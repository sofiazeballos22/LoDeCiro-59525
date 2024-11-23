import { StyleSheet, Text, View , TextInput} from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearch}) => {
  return (
     <TextInput
         placeholder='Busca un producto'
         onChangeText={(text)=>setSearch(text)}
         style={styles.searchInput}
      ></TextInput>
  )
}

export default Search

const styles = StyleSheet.create({
   searchInput:{
   marginHorizontal: 20,
   borderWidth: 2,
   borderColor: colors.azulMarino,
   borderRadius: 15,
   padding: 8,
   }
})