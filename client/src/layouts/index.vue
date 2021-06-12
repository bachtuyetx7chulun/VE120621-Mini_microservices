<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <p class="text-center fw-bold mt-3 fs-4">Create Post</p>
        <div class="form-group">
          <label for="">Post Name</label>
          <input
            type="text"
            name="postName"
            v-model.lazy="postName"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
          <small id="helpId" class="text-muted">Enter your post name</small>
        </div>
        <button
          type="button"
          @click="createPost()"
          name=""
          id=""
          class="btn btn-primary mt-2"
        >
          Create
        </button>
      </div>
      <div class="row">
        <Post
          v-for="post in posts"
          :key="post"
          :title="post.title"
          :id="post.id"
          :comments="post.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/Form/Post";

export default {
  name: "Page",
  components: {
    Post,
  },
  data() {
    return {
      postName: "",
      posts: [],
    };
  },
  methods: {
    async createPost() {
      if (this.postName !== "") {
        const post = await axios.post("http://localhost:4000/posts", {
          title: this.postName,
        });

        this.posts.unshift({ comments: [], ...post.data });
        this.postName = "";
      }
    },

    getPosts() {
      axios
        .get("http://localhost:4002/posts")
        .then((result) => {
          const { data } = result;
          this.posts = Object.values(data).reverse();
        })
        .catch((err) => {
          setTimeout(this.getPosts, 5000);
        });
    },
  },

  mounted() {
    this.getPosts();
  },
};
</script>

<style></style>
