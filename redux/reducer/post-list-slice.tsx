import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "../../types/post-type";
import { mockPostList } from "../../screens/post-list/mock-post";
interface PostListStateProps {
    totalPage: number;
    currentPage: number;
    postList: PostType[];
}

const initialState: PostListStateProps = {
    postList: [],
    currentPage: 0,
    totalPage: 0

}
const PostListSlice = createSlice({
    name: "post-list-slice",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },
        setPostListPage: (state, action) => {
            state.postList = action.payload
        },
        setAllData: (state, action) => {
            state.postList = action.payload.currentPage === 0 ? action.payload.postList : [...state.postList, ...action.payload.postList]
            state.totalPage = action.payload.totalPage
            state.currentPage = action.payload.currentPage
        }
    }
})

export const { setAllData, setCurrentPage, setTotalPage, setPostListPage } = PostListSlice.actions;

export default PostListSlice.reducer;