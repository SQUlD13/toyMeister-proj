<template>
  <section v-if="toy" class="toy-details">
    <h1>{{ toy.name }}</h1>
    <div class="flex center">
      <h2>Price:</h2>
      <p class="light">{{ toy.price }}</p>
    </div>
    <div class="flex center">
      <h2>Type:</h2>
      <p class="light">{{ toy.type.txt }}</p>
    </div>
    <toyReviewList
      :toy="toy"
      :reviews="reviews"
      @update-reviews="updateReviews"
    />
  </section>
</template>

<script>
import toyPreview from "@/cmps/toyPreview.vue";
import toyReviewList from "@/cmps/toyReviewList.vue";
import toyService from "@/services/toy.service.js";
import reviewService from "@/services/review.service.js";
import userService from "@/services/user.service";
export default {
  data() {
    return {
      toy: null,
      reviews: null,
    };
  },
  computed: {
    toyId() {
      return this.$route.params.id;
    },
  },
  async created() {
    if (this.toyId) {
      try {
        const toy = await toyService.getById(this.toyId);
        this.toy = JSON.parse(JSON.stringify(toy));

        this.updateReviews();
      } catch (err) {
        throw err;
      }
    }
    console.log(this.toy);
  },
  methods: {
    async updateReviews() {
      const reviews = await reviewService.queryByToyId(this.toyId);
      console.log(
        "🚀 ~ file: toyDetails.vue ~ line 50 ~ updateReviews ~ reviews",
        reviews
      );
      reviews.forEach(async (review) => {
        const user = await userService.getById(review.byUser._id);
        review.byUser = user;
      });
      console.log(
        "🚀 ~ file: toyDetails.vue ~ line 49 ~ updateReviews ~ reviews",
        reviews
      );
      this.reviews = reviews;
    },
  },
  components: { toyPreview, toyReviewList },
};
</script>