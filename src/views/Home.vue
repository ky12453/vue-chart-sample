<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="#FF6633" height="200">
            <v-card-title>card title</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="#FF6633" height="200">
            <v-card-title>card title</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
