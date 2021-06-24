<template>
  <v-app>
    <v-app-bar app density="compact">
      <v-app-bar-title color="primary"
        ><v-icon>mdi-virus-outline</v-icon> COVID-19 Stats</v-app-bar-title
      >
      <v-btn class="mx-3" color="primary" link to="/" @click="countries = !countries" text
        >World</v-btn
      >
      <v-divider inset vertical></v-divider>

      <v-btn link to="/countries" color="primary" class="mx-3" text>Countries</v-btn>
    </v-app-bar>

    <v-main>
      <let-it-snow
      v-bind="snowConf"
      :show="show"    
      class="snow"
    ></let-it-snow>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    covidData: null,
    loaded: false,
    countries: false,
    snowConf: {
            windPower : 0.1,  
            speed : 0.1,
            count : 5,
            size : 5,
            opacity : 1,
            images: ['https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png',
                    'https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png',
                    'https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png']
        },
        show: false
  }),
  created() {},
  mounted() {
    this.show = true;
  }
};
</script>
<style>
#title {
  margin: 1.5rem;
  text-align: center;
}
.snow {
  position: absolute;
  z-index: 3;
}
</style>
