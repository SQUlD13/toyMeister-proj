<template>
  <ValidationObserver
    class="toy-edit"
    v-slot="{ invalid, errors }"
    ref="observer"
  >
    <form v-if="toyToEdit" @submit="saveToy($event)">
      <errorList :errors="errors"></errorList>
      <ValidationProvider name="Toy Name" rules="required" immediate>
        <el-input
          class="text-edit"
          type="text"
          v-model="toyToEdit.name"
          placeholder="Toy Name..."
        />
      </ValidationProvider>

      <ValidationProvider name="Type" rules="required" immediate>
        <el-select
          class="type-select"
          v-model="toyToEdit.type"
          placeholder="Select Toy Type..."
          value-key="txt"
          clearable
        >
          <el-option
            v-for="toyType in toyTypes"
            :key="toyType.color"
            :label="toyType.txt"
            :value="toyType"
            :value-key="toyType.txt"
          >
          </el-option>
        </el-select>
        <p style="margin-block: 5px">{{ errors[0] }}</p>
      </ValidationProvider>

      <div>
        <h2>Price :</h2>
        <el-slider
          type="range"
          :min="0"
          :max="1000"
          show-input
          v-model.number="toyToEdit.price"
        />
      </div>

      <el-switch
        v-model="toyToEdit.inStock"
        active-text="In Stock"
        inactive-text="Sold Out"
        :style="'display:block; margin-block:10px'"
      />

      <el-button type="submit" @click="saveToy($event)" :disabled="invalid"
        >Submit</el-button
      >
    </form>
  </ValidationObserver>
</template>

<script>
import toyService from "../services/toy.service.js";
import typeSelect from "../cmps/filter/typeSelectFilter.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import errorList from "../cmps/errorList.vue";

// Add the required rule
extend("required", {
  ...required,
  message: "{_field_} is required",
});

export default {
  data() {
    return {
      toyToEdit: null,
    };
  },
  computed: {
    toyId() {
      return this.$route.params.id;
    },
    toyTypes() {
      return this.$store.getters.toyTypes;
    },
  },
  created() {
    if (this.toyId) {
      toyService.getById(this.toyId).then((toy) => {
        this.toyToEdit = JSON.parse(JSON.stringify(toy));
      });
    } else {
      const emptyToy = toyService.getEmptyToy();
      this.toyToEdit = emptyToy;
    }
  },
  methods: {
    saveToy(ev) {
      ev.preventDefault();
      if (this.toyToEdit.name && this.toyToEdit.type) {
        console.log("submitting");
        this.$store
          .dispatch({ type: "saveToy", toy: this.toyToEdit })
          .then((toy) => {
            this.toyToEdit = toy;
            this.$store.dispatch({ type: "loadToys" });
          });
      }
    },
  },
  components: { typeSelect, ValidationProvider, ValidationObserver, errorList },
};
</script>