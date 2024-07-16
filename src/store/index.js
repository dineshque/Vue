import { createStore } from "vuex";

const store = createStore({
  state: {
    posts: [],
    users: [],
    comments: [],
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      commit("SET_POSTS", data);
    },
    async fetchUsers({ commit }) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      commit("SET_USERS", data);
    },
    async fetchComments({ commit }, postId) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await response.json();
      commit("SET_COMMENTS", data);
    },
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
  },
});

export default store;
