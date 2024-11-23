import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors';


const StarsRating = ({ rating }) => {
    const fullStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5-Math.floor(rating));

    return (
        <View style={styles.starsContainer}>
            <Text style={styles.starsStyle}>{fullStars}{emptyStars}</Text>
        </View>
    )
}



export default React.memo(StarsRating)

const styles = StyleSheet.create({
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsStyle: {
        color: colors.beigeOscuro,
    }
})