<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <h2>{{ post.title }}</h2>
          <!-- <p>{{ post.body }}</p> -->
          <p>By: {{ getUser(post.userId).name }}</p>
        </router-link>
      </li>
      <br /><br />
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "PostList",
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["getUserById"]),
    getUser() {
      return this.getUserById;
    },
  },
  created() {
    this.fetchPosts();
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchPosts", "fetchUsers"]),
  },
};
</script>
