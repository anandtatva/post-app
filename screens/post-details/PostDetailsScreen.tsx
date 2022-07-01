import { Text, View, StyleSheet } from "react-native"
import { commonStyle, colors } from "../../utils";
const index = "Details"
const PostDetailsScreen = ({ route }) => {
    const { item = {} } = route?.params || {}
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Title`}>Title</Text>
                <Text style={styles.text} numberOfLines={1} testID={`Title-${index}`}>{item.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Author`}>Author</Text>
                <Text style={styles.text} testID={`Author-${index}`}>{item.author}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`URL`}>URL</Text>
                <Text style={styles.text} testID={`URL-${index}`}>{item.url} {item.url}{item.url}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Created-At`}>Created At</Text>
                <Text style={styles.text} testID={`Created-At-${index}`}>{item.created_at}</Text>
            </View>
        </View>
    )
}

export default PostDetailsScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        paddingVertical: 5,
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    title: {
        textAlign: "center",
        paddingBottom: 5,
        fontWeight: "bold",
        color: colors.secondary,
    },
    text: {
        textAlign: "center",
        paddingLeft: 5,
        color: colors.secondary,
        opacity: 0.8,
        fontWeight: "300",
    }
})