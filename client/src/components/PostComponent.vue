<template>
  
  <div class="container">
    <v-card style="margin:20px">
      <v-card-title color="blue" id="card_title">
    <v-row>
        <v-col cols="5" offset = "3">
        <h1 style="color:white; " ><v-icon size="sm">mdi-post</v-icon> Latest Posts </h1>
      </v-col>
    </v-row>
    <v-row>
        <v-col >
        <div class="create-post">
      <label for="create-post" style="color:white" > Say something:</label>
<!--    <input style="color:white; border:1px solid white;border-radius: 3px;margin: 10px" type="text" id="create-post" v-model="text" placeholder="Create a post" :rules="inputRulesTitle">--> 
<v-form ref="form" v-model="form" >
                    <v-text-field label="Create a Post" v-model="text" :rules="inputRulesTitle" > </v-text-field>
                    </v-form>
      <v-btn id="vbtn" style="padding: 3px; margin: 5px 10px 10px; color:white;background-color:#2929B3" v-on:click="createPost" class="button" :disabled="!form">Post</v-btn>
      
    </div>
      </v-col>
    </v-row>
    </v-card-title >
    <hr>
    <p class="error" v-if="error"> {{ error }}</p>
    <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
      >
      <v-card >
      <v-card-title id="title" style="color:white" >
        <v-icon style="margin: 2">mdi-clock-outline</v-icon> 
        {{ post.createdAt.getDate()}} / {{ post.createdAt.getMonth()+1 }} / {{ post.createdAt.getFullYear() }}
      </v-card-title>
      <v-card-text padding="100px" >
        <p padding="5px" class="text"> {{ post.text }}</p>
      </v-card-text>
      </v-card>
      </div>
    </div>
  </v-card>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data(){
    return {
      posts:[],
      post:'',
      error: '',
      text: '',
      form: false,
      inputRulesTitle:[
                v => v && v.length > 0 || 'Post is required!'
            ],
    }
  },
  async created(){
    
    try{
      this.posts = await PostService.getPosts();
    }
    catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async createPost(){
      if(this.$refs.form.validate()){
                
        
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
        
     }
      
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
}

p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post{
  padding: 5px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  
  font-size: 13px;
}

#title{
  background-color:rgb(84, 84, 255);
  padding: 100x;
}

#card_title{
  background-color:rgb(156, 156, 255);
  
}
p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 10px;
}

#v-btn{
  margin: 100px 5px 10px;
}


</style>
