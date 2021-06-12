<template>
  <p class="text-color">{{ comment }}</p>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: String,
      default: "Comment",
    },
  },
};
</script>

<style>
.text-color {
  color: #6f42c1;
}
</style>
