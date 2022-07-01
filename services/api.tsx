import { PostType } from "../types/post-type";

type SuccessResponse = {
    status: true,
    data: PostType[],
    currentPage: number,
    totalPage: number;
}
type FailedResponse = {
    status: false;
    message: string;
}
const getPostAPIs = async (currentPage = 0): Promise<SuccessResponse | FailedResponse> => {
    try {
        let resp = await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + currentPage);
        resp = await resp.json();
        const { hits, page, nbPages }: any = resp;
        const data = hits?.map(({ title, url, author, created_at }: PostType) => ({ title, url, author, created_at }))
        return {
            status: true,
            data,
            currentPage: page,
            totalPage: nbPages
        }
    } catch (error) {
        // console.log(error)
        return {
            status: false,
            message: "Something went wrong"
        }
    }

}

export {
    getPostAPIs
}