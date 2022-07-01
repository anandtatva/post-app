import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { PostType } from "../../types/post-type";
import { FC } from "react";
import { colors } from "../../utils";


interface PostContainerProps {
    index: number;
    item: PostType;
    onNext: (item: PostType) => void;
}
const PostContainerView: FC<PostContainerProps> = ({
    item, index, onNext
}) => {
    const handleNext = () => { onNext(item) }
    return (
        <TouchableOpacity
            onPress={handleNext}
            testID={`Post-Row-${index}`}
            style={styles.conatiner}
        >
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Title`}>Title</Text>
                <Text style={styles.text} numberOfLines={1} testID={`Title-${index}`}>{item.title}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Author`}>Author</Text>
                <Text style={styles.text} numberOfLines={1} testID={`Author-${index}`}>{item.author}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`URL`}>URL</Text>
                <Text style={styles.text} numberOfLines={1} testID={`URL-${index}`}>{item.url} {item.url}{item.url}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title} testID={`Created-At`}>Created At</Text>
                <Text style={styles.text} numberOfLines={1} testID={`Created-At-${index}`}>{item.created_at}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostContainerView;

const styles = StyleSheet.create({
    detailsContainer: {
        paddingVertical: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    conatiner: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    title: {
        flex: 2,
        fontWeight: "bold",
        color: colors.secondary

    },
    text: {
        flex: 4,
        paddingLeft: 5,
        color: colors.secondary,
        fontWeight: "300",
    }
})