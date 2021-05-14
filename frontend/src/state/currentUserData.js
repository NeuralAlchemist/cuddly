import { atom, selector } from "recoil";
import PostsApi from "../api/PostsApi"
import UserApi from "../api/UserApi";

export const currentUsersState = atom({
  key: "currentUsersState",
  default: {},
});

export const currentUserValue = selector({
  key: 'currentUserValue',
  get: async ({get}) => {
    const response = await UserApi.getUser({
        currentUsersState: get(currentUsersState),
    });
    return response.data;
  },
});