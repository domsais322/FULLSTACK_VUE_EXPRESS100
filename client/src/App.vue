<template>
  <v-app>
    <v-main>
      <v-app-bar style="background-color:rgb(84, 84, 255);color: white;">
        <v-row style="padding:20px">
            <h1> SaisChat</h1>
            <v-icon>mdi-all-inclusive</v-icon>
          
        </v-row>
      
      </v-app-bar>
      <PostComponent/>
    </v-main>
  </v-app>
</template>
<script>
import PostComponent from './components/PostComponent.vue'
export default {
  name: 'App',

  components: {
    PostComponent,
  },
   
  data: () => ({
    //
  }),
}
</script>
