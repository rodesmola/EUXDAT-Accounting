<template>
  <v-app>
    <v-content>
      <HomeView/>
    </v-content>
  </v-app>
</template>


<script>
import HomeView from './components/Home.vue'

export default {
  name: 'app',
  components: {
    HomeView
  },
  methods: {
  },
  created(){
  }
}
</script>

<style>
</style>
