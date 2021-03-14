<template>
  <section class="toy-reviews">
    <h1>Reviews :</h1>
    <ul v-if="reviews" class="clean-list review-list">
      <li
        v-for="review in reviews"
        :key="review._id"
        style="margin-block-end: 5px"
      >
        <!-- <pre>{{ review }}</pre> -->
        <div class="user-info">
          <p>
            By : <span>{{ review.byUser.username }}</span>
          </p>
        </div>
        <div class="review-content">
          <p>
            Content:
            <span style="white-space: pre-line">{{ review.txt }}</span>
          </p>
        </div>

        <div class="review-controls">
          <button
            v-if="isAdmin || user._id === review.byUser._id"
            @click="deleteReview(review._id)"
          >
            Delete
          </button>
          <button
            v-if="isAdmin || user._id === review.byUser._id"
            @click="$router.push(`/review/${review._id}`)"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
    <p v-else>No Review's available</p>

    <div class="review flex column center">
      <button v-if="loggedIn && !reviewOpen" @click="reviewOpen = true">
        Add Review
      </button>
      <form
        v-if="reviewOpen"
        @submit.prevent="submitReview"
        class="flex column center"
      >
        <textarea style="resize: none" v-model="review"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import userService from "../services/user.service";
export default {
  props: ["toy", "reviews"],
  data() {
    return {
      review: "",
      reviewOpen: false,
      author: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async submitReview() {
      console.log("submitting Review!");
      try {
        const review = {
          txt: this.review,
          byUserId: this.user._id,
          aboutToyId: this.toy._id,
        };
        await this.$store.dispatch({ type: "submitReview", review });
        this.$emit("update-reviews");
      } catch (err) {
        throw err;
      }
    },
    async deleteReview(id) {
      try {
        await this.$store.dispatch({ type: "deleteReview", id });
        this.$emit("update-reviews");
      } catch (err) {
        throw err;
      }
    },
    // async getAuthor(id) {
    //   try {
    //     const user = await userService.getById(id);
    //     console.log(
    //       "🚀 ~ file: toyReviewList.vue ~ line 105 ~ getAuthor ~ user",
    //       user
    //     );
    //     return user.username;
    //   } catch (err) {
    //     throw err;
    //   }
    // },
  },
};
</script>
