<template>
  <div class="col-sm-12 col-md-6 col-xl-6 mt-4">
    <div class="card text-left">
      <div class="card-body">
        <div class="card-body__top d-flex justify-content-between">
          <h4 class="card-title fw-light">{{ title }}</h4>
          <button
            class="btn btn-outline-primary"
            @click="showForm()"
            v-if="!isCreate"
          >
            Create comment
          </button>
          <button class="btn btn-outline-warning" @click="showForm()" v-else>
            Close Form
          </button>
        </div>
        <div class="btn-group w-100 mt-3" v-show="isCreate">
          <input
            type="text"
            class="form-control"
            name="commentContent"
            v-model.lazy="commentContent"
          />
          <button class="btn btn-outline-primary" @click="createComment()">
            Create
          </button>
        </div>
        <div class="card-body__bottom mt-3" v-show="comments.length > 0">
          <hr />
          <Comment
            v-for="comment in comments"
            :key="comment"
            :comment="comment.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../Comment";
import axios from "axios";

export default {
  name: "Post",
  components: {
    Comment,
  },
  data() {
    return {
      comments: [],
      isCreate: false,
      commentContent: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "Title",
    },
    id: {
      type: String,
    },
    // comments: {
    //   type: Array,
    // },
  },
  methods: {
    getComments() {
      axios
        .get(`http://localhost:4001/posts/${this.id}/comments`)
        .then((result) => {
          this.comments = result.data;
        });
    },
    showForm() {
      this.isCreate = !this.isCreate;
    },
    async createComment() {
      const comment = await axios.post(
        `http://localhost:4001/posts/${this.id}/comments`,
        {
          content: this.commentContent,
        }
      );
      this.comments = comment.data;
      this.commentContent = "";
    },
  },
  mounted() {
    this.getComments();
  },
};
</script>

<style></style>
