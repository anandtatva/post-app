import MockAsynStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { enableFetchMocks } from "jest-fetch-mock"
jest.mock("@react-native-async-storage/async-storage", () => MockAsynStorage)

enableFetchMocks()
jest.mock("redux-persist", () => {
    const real = jest.requireActual("redux-persist");
    return {
        ...real,
        persistReducer: jest.fn().mockImplementation((config, reducer) => reducer)
    }
})