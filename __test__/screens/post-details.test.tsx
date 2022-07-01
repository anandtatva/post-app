import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";
import { setAllData } from "../../redux/reducer/post-list-slice";
import PostDetailsScreen from "../../screens/post-details/PostDetailsScreen";
import { mockPostList } from "../../screens/post-list/mock-post";


describe("Screen: Post Details", () => {
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
        const route = {
            params: {
                item: mockPostList[0]
            }
        }
        const tree = render(
            <Provider store={store}>
                <PostDetailsScreen route={route} />
            </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it("should be show correct details of any post", () => {
        const item = mockPostList[0];
        const route = {
            params: {
                item
            }
        }
        const { getByTestId } = render(
            <Provider store={store}>
                <PostDetailsScreen route={route} />
            </Provider>
        )
        const title = getByTestId("Title-Details");
        const url = getByTestId("URL-Details");
        const author = getByTestId("Author-Details");
        const createdAt = getByTestId("Created-At-Details");

        expect(title.children[0]).toBe(item.title)
        expect(url.children[0]).toBe(item.url)
        expect(createdAt.children[0]).toBe(item.created_at)
        expect(author.children[0]).toBe(item.author)
    })
})