<template>
  <div class="avatar">
    <!-- <nuxt-link to="/stats"> -->
      <!-- {{ name }} -->
    <!-- </nuxt-link> -->
    <!-- <br /> -->
    [{{hp}} / MAX]
    <br>
  </div>
</template>

<script>
import Requester from "~/components/request-cfg.vue";

export default {
  data() {
    return {
      name: "",
      hp: 0
    };
  },
  mounted() {
    this.LoadPlayer();
  },
  methods: {
    LoadPlayer: function() {
      Requester.get("_player-fast")
        .then(response => {
          this.name = response.data.name;

          this.hp = response.data.hp;
        })
        .catch(error => {
          console.log("Avatar err: ", error);
        })
        .finally(() => {
          console.log("final....");
        });
    }
  }
};
</script>

<style>
.avatar{
  /* border: 1px solid green; */
  padding: 0px;
  margin: 0px;
  /* width: 20%; */
  /* height: 10vw; */
}
</style>
