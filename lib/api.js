import { getData } from "@/utils/AxiosUtils";

export const getPosts = () => getData('/posts');
export const getPost = (id) => getData(`/posts/${id}`);
export const getUsers = () => getData('/users');
export const getUser = (id) => getData(`/users/${id}`);
export const getComments = (postId) => getData(`/comments?postId=${postId}`);