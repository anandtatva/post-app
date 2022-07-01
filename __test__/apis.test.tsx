import { cleanup, fireEvent, render, waitFor } from "@testing-library/react-native";
import { getPostAPIs } from "../services/api";
import 'jest-fetch-mock';

describe("APIs: get post api", () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https?:\/\/example.com*$/)
    })
    it("call api correctly", async () => {
        const resp = await getPostAPIs(0);
        expect(resp.status).toBeTruthy()
    })
    it("If we provide invalid page number then there is no data provided by API", async () => {
        const resp = await getPostAPIs(100);
        expect(resp.status).toBeTruthy()
        expect(resp.status && resp.data.length).toBe(0)
    })
})