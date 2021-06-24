<template>
  <section>
    <v-menu bottom dark origin="center center" transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="my-5"
          max-width="300px"
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Select Country
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          style="cursor: pointer"
          class="item"
          v-for="(item, i) in items"
          :key="i"
          @click="clickHandler(item)"
        >
          <v-list-item-title>{{ item.country }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <h1 style="text-align: center; margin: 25px">
      {{ this.country }}
    </h1>
    <div class="cards">
      <v-row align="center" justify="center">
        <Card
          cardTitle="Total Cases"
          :amount="covidData.cases || '0'"
          :newAmount="covidData.todayCases || '0'"
          :icon="'mdi-alert-circle-outline'"
          :textColor="'lightblue'"
          :loading="loaded"
        />
        <Card
          cardTitle="Deaths"
          :amount="covidData.deaths || '0'"
          :newAmount="covidData.todayDeaths || '0'"
          :icon="'mdi-grave-stone'"
          :textColor="'pink'"
          :loading="loaded"
        />
        <Card
          cardTitle="Recovered"
          :amount="covidData.recovered || '0'"
          :newAmount="covidData.todayRecovered || '0'"
          :icon="'mdi-hospital-box'"
          :textColor="'lightgreen'"
          :loading="loaded"
        />
      </v-row>
    </div>
    <div class="visuals">
      <v-row justify="center">
      <Chart v-if="chartLoaded" :chartdata="chartdata" :options="options" />
      <Chart
        v-if="chartLoaded"
        :chartdata="chartdataDeaths"
        :options="options"
      />
      <Chart
        v-if="chartLoaded"
        :chartdata="chartdataRecovered"
        :options="options"
      />
    </v-row>
    </div>
  </section>
</template>

<script>
import Card from "../components/Card.vue";
import Chart from '../components/Chart.vue'
export default {
  name: "Countries",
  components: {
    Card,
    Chart
  },
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
    loaded: false,
    covidData: {
      cases: 0,
      todayCases: 0,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      todayRecovered: 0,
    },
    country: "USA",
    chartLoaded: false,
    historical: null,
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Cases",
          backgroundColor: "lightblue",
          data: [],
        },
      ],
    },
    chartdataDeaths: {
      labels: [],
      datasets: [
        {
          label: "Deaths",
          backgroundColor: "pink",
          data: [],
        },
      ],
    },
    chartdataRecovered: {
      labels: [],
      datasets: [
        {
          label: "Recovered",
          backgroundColor: "lightgreen",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  created() {
    this.axios
      .get(`https://disease.sh/v3/covid-19/countries?sort=active`)
      .then((res) => {
        this.loaded = true;

        this.items = res.data.slice(0,17)
        this.clickHandler({ country: "Russia" });
      });
  },
  methods: {
    clickHandler(item) {
      this.loaded = true;
      this.historical = null;
      this.chartLoaded = false;
      this.chartdata= {
      labels: [],
      datasets: [
        {
          label: "Cases",
          backgroundColor: "lightblue",
          data: [],
        },
      ],
    }
    this.chartdataDeaths ={
      labels: [],
      datasets: [
        {
          label: "Deaths",
          backgroundColor: "pink",
          data: [],
        },
      ],
    },
    this.chartdataRecovered = {
      labels: [],
      datasets: [
        {
          label: "Recovered",
          backgroundColor: "lightgreen",
          data: [],
        },
      ],
    }
      this.country = item.country;
      this.axios
        .get(
          `https://disease.sh/v3/covid-19/countries/${this.country}?strict=true`
        )
        .then((res) => {
          setTimeout(() => {
            this.covidData = res.data;
            this.loaded = false;
            this.updateChart()
            console.log(this.covidData.cases);

          }, 1000);

        });
    },
    updateChart() {
      this.axios
      .get(
        `https://disease.sh/v3/covid-19/historical/${this.country}?lastdays=20`
      )
      .then((res) => {
        this.historical = res.data.timeline;
        let cases = this.historical.cases;
        let deaths = this.historical.deaths;
        let recovered = this.historical.recovered;
        console.log(recovered)
        for (let key in recovered) {
          this.chartdataRecovered.labels.push(key);
          this.chartdataRecovered.datasets[0].data.push(recovered[key]);
        }
        for (let key in deaths) {
          this.chartdataDeaths.labels.push(key);
          this.chartdataDeaths.datasets[0].data.push(deaths[key]);
        }
        for (let key in cases) {
          this.chartdata.labels.push(key);
          this.chartdata.datasets[0].data.push(cases[key]);
        }
        this.chartLoaded = true
      });
    }
  },
};
</script>

<style scoped>
.v-btn {
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
}
.item:hover {
  color: gray;
  background-color: #9c27b0;
}
</style>