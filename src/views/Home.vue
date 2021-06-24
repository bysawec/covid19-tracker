<template>
  <section v-if="!countries">
    <div class="text-xl-h3" id="title">World Summary</div>
    <div v-if="loaded" class="cards">
      <v-row align="center" justify="center">
        <Card
          cardTitle="Total Cases"
          :amount="covidData.cases"
          :newAmount="covidData.todayCases"
          :icon="'mdi-alert-circle-outline'"
          :textColor="'lightblue'"
        />
        <Card
          cardTitle="Deaths"
          :amount="covidData.deaths"
          :newAmount="covidData.todayDeaths"
          :icon="'mdi-grave-stone'"
          :textColor="'pink'"
        />
        <Card
          cardTitle="Recovered"
          :amount="covidData.recovered"
          :newAmount="covidData.todayRecovered"
          :icon="'mdi-hospital-box'"
          :textColor="'lightgreen'"
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
import axios from "axios";
import Card from "@/components/Card.vue";
import Chart from "@/components/Chart.vue";
export default {
  name: "Home",

  components: {
    Card,
    Chart,
  },
  data: () => ({
    covidData: null,
    loaded: false,
    countries: false,
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
    axios.get(`https://disease.sh/v3/covid-19/all`).then((res) => {
      this.covidData = res.data;
      this.loaded = true;
    });
    axios
      .get(`https://disease.sh/v3/covid-19/historical/all?lastdays=20`)
      .then((res) => {
        this.historical = res.data;
        let cases = this.historical.cases;
        let deaths = this.historical.deaths;
        let recovered = this.historical.recovered;
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
        this.chartLoaded = true;
      });
  },
};
</script>
<style>
.visuals {
  display: flex;
  margin-top: 4rem;
  align-items: center;
  justify-content: center;
}
#title {
  margin: 1.5rem;
  text-align: center;
}
</style>
};
