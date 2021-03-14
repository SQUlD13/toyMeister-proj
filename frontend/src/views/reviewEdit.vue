<template>
  <form v-if="review" class="review-edit" @submit.prevent="updateReview">
    <!-- <pre>{{ review }}</pre> -->
    <p class="edit-content">
      content :
      <textarea v-model="txt"> </textarea>
    </p>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import reviewService from "@/services/review.service.js";
export default {
  data() {
    return {
      review: null,
      txt: "",
      score: 0,
    };
  },
  async created() {
    try {
      const review = await reviewService.query(this.id);
      this.review = review;
      this.txt = review.txt;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    updateReview() {
      const review = { ...this.review, txt: this.txt };
      this.$store.dispatch({ type: "updateReview", review });
    },
  },
};
</script>
