import { atom, selector } from "recoil";
import PostsApi from "../api/PostsApi"

export const postsState = atom({
  key: "postsState",
  default: [],
});

export const allPosts = selector({
  key: 'allPosts',
  get: async ({get}) => {
    const response = await PostsApi.getAllPosts({
      postsState: get(postsState),
    });
    return response.data;
  },
});