import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import PostListScreen from "../../screens/post-list/PostListScreen";
import { setAllData } from "../../redux/reducer/post-list-slice";
import { strings } from "../../utils";
import { mockPostList } from "../../screens/post-list/mock-post";


jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native")
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn()
        }),
        useFocusEffect: () => jest.fn(),
        useRoute: () => ({
            params: {}
        })
    }

})
describe("Screen: Post List", () => {
    beforeEach(() => {
        store.dispatch(setAllData({
            currentPage: 0,
            totalPage: 0,
            postList: []
        }))
    })
    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
    })
    it("renders correctly", () => {
        const navigation = { navigate: jest.fn() }
        const tree = render(
            <Provider store={store}>
                <PostListScreen navigation={navigation} />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it("show empty message if no post found", () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <PostListScreen navigation={navigation} />
            </Provider>
        )
        const emptyText = getByTestId("Empty-Post-List");
        expect(emptyText.children[0]).toBe(strings.emptyPostList)
    })
    it("move to details page on press post row", () => {
        store.dispatch(setAllData({
            currentPage: 1,
            totalPage: 1,
            postList: mockPostList
        }))
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <PostListScreen navigation={navigation} />
            </Provider>
        )
        const postRow1 = getByTestId("Post-Row-1");
        fireEvent.press(postRow1)
        expect(navigation.navigate).toHaveBeenCalledWith("PostDetailsScreen", { item: mockPostList[1] })
    })
    it("page should be show correct total page, current page and total post", () => {
        const data = {
            currentPage: 0,
            totalPage: 1,
            postList: mockPostList
        }
        store.dispatch(setAllData(data))
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <Provider store={store}>
                <PostListScreen navigation={navigation} />
            </Provider>
        )
        const currentTotalPost = getByTestId("Current-Total-Post");
        const currentPageNTotalPage = getByTestId("Current-Page-Total-Page");

        expect(currentTotalPost.children[1]).toBe(String(data.postList.length)) // current total post
        expect(currentPageNTotalPage.children[1]).toBe(String(data.currentPage + 1)) // total page
        expect(currentPageNTotalPage.children[3]).toBe(String(data.totalPage)) // current page
    })
})