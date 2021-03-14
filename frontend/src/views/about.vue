<template>
  <div class="about" ref="page">
    <div ref="pageContent">
      <h1>Feel free to say hi at any of the following locations!</h1>
      <!-- <pre>{{ this.center }}</pre> -->
    </div>
    <gmap-map
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      :style="'width: 100%; height: ' + this.height + 'px'"
      ref="mapRef"
    >
      <gmap-marker
        :key="idx"
        v-for="(m, idx) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m, idx)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      />
    </gmap-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,

      markers: [
        {
          position: { lat: 32.075213294443024, lng: 34.77487512485227 },
          name: "Dizengoff Branch",
        },
      ],
      center: null,

      currentMidx: null,
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  created() {
    this.center = this.markers[0].position;
  },
  mounted() {
    const pageHeight = this.$refs.page.offsetHeight;
    const contentHeight = this.$refs.pageContent.offsetHeight;
    const yPadding = Math.abs(
      this.$refs.page.offsetTop - this.$refs.pageContent.offsetTop
    );
    console.log(
      "Margin",
      window.getComputedStyle(this.$refs.pageContent).marginBottom
    );
    this.height = pageHeight - contentHeight - yPadding * 2 - 15;
  },
  methods: {
    panTo(position) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(position);
      });
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.name;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
      this.panTo(marker.position);
    },
  },
};
</script>