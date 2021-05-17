import { atom, selector } from "recoil";
import UserApi from "../api/UserApi"

export const usersState = atom({
  key: "usersState",
  default: [],
});

export const allUsers = selector({
  key: 'allUsers',
  get: async ({get}) => {
    const response = await UserApi.getAllUsers({
      usersState: get(usersState),
    });
    return response.data;
  },
});