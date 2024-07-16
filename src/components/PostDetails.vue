<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <h2>Author: {{ user.name }}</h2>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <p>{{ comment.body }}</p>
        <p>By: {{ comment.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "PostDetails",
  data() {
    return {
      post: {},
    };
  },
  computed: {
    ...mapState(["comments"]),
    ...mapGetters(["getUserById"]),
    user() {
      return this.getUserById(this.post.userId) || {};
    },
  },
  created() {
    this.fetchPostDetails();
  },
  methods: {
    async fetchPostDetails() {
      const postId = this.$route.params.id;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await response.json();
      this.post = data;
      this.fetchComments(postId);
      this.fetchUsers();
    },
    ...mapActions(["fetchComments", "fetchUsers"]),
  },
};
</script>
