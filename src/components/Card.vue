<template>
  <v-card
    class="summary-card"
    :loading="loading"
    max-width="374"
    elevation="100"
    outlined
  >
    <v-icon color="textColor" class="icon" x-large>{{ icon }}</v-icon>

    <v-row justify="center" align="center">
      <v-card-title class="amount" :style="'color:' + textColor" >{{ amount.toLocaleString()}}</v-card-title>
      <v-card-text style="text-align:center; color:gray">+{{ newAmount.toLocaleString()}}</v-card-text>

      <v-card-title style="margin-bottom: 10px">{{ cardTitle }}</v-card-title>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: ["cardTitle", "amount", "newAmount", "icon", "textColor", "loading"],
};
</script>

<style scoped>
.summary-card {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 16px rgb(255, 255, 255);
  margin: 1rem;
}
.v-row {
  flex-direction: column;
}
.icon {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 3rem;
}
.amount {
  padding: 0px 20px;
  font-weight: 700;
  font-size: 40px;
  margin-bottom:.5rem;
}
</style>