import { Text, View, FlatList, StyleSheet } from "react-native"
import { mockPostList } from "./mock-post";
import PostContainerView from "./post-container";
import { PostType } from "../../types/post-type";
import { useSelector, useDispatch } from "react-redux";
import { colors, strings, commonStyle, showAlert } from "../../utils";
import { getPostAPIs } from "../../services/api";
import { setTotalPage, setAllData } from "../../redux/reducer/post-list-slice";
import { useEffect } from "react";

const PostListScreen = ({ navigation }) => {
    const postList = useSelector(state => state.posts)
    const dispatch = useDispatch();
    useEffect(() => {
        _loadPostList(0);
    }, [])
    const _loadPostList = async (page: number) => {
        const resp = await getPostAPIs(page);
        if (resp.status) {
            const { data, currentPage, totalPage } = resp;
            dispatch(setAllData({
                totalPage,
                postList: data,
                currentPage
            }))
            if (totalPage > currentPage + 1) {
                setTimeout(() => {
                    _loadPostList(page + 1)
                }, 10000);
            }
        } else showAlert(resp.message)
    }
    const renderItem = ({ item, index }: { item: PostType; index: number; }) => (
        <PostContainerView
            onNext={(item: PostType) => { navigation.navigate("PostDetailsScreen", { item }) }}
            item={item}
            index={index}
        />
    )
    return (
        <FlatList
            ListHeaderComponent={() => <View style={{
                paddingVertical: 10,
            }}>
                <Text style={styles.emptyText} testID="Current-Total-Post">Current Total Post:- {postList.postList.length}</Text>
                <Text style={styles.emptyText} testID="Current-Page-Total-Page">Current Page:- {postList?.currentPage + 1} Total Page:-  {postList?.totalPage}</Text>
            </View>}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={postList?.postList || []}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderItem}
            ListEmptyComponent={() => (
                <Text style={styles.emptyText} testID="Empty-Post-List" >{strings.emptyPostList}</Text>
            )}
        />
    )
}

export default PostListScreen;

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1.5,
        borderColor: colors.gray
    },
    emptyText: {
        fontWeight: "bold",
        textAlign: "center"
    }
})