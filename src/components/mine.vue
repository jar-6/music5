<template>
    
    <div class="mine" v-show="isShowIndex">
     <p class="mylist-title">我的收藏</p>
   <!--   <img class="search-play-icon" src="./../assets/img/icon-play-black.png"> -->
        <div
        class="my-list"
        
        v-for="(value,index) in myList">
          <p class="result-normal"
          @click="addPlay(index)">{{value.name}}</p>
         <img 
          class="search-play-icon" 
          v-bind:src="srcPlay"
          v-show="myList[index].id===songList[num].id"/> 
          
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'mine',

  data() {
    return {
    
    };
  },
  computed: {
   myList(){return this.$store.state.myList},
   srcPlay(){return this.$store.state.srcPlay},
   songList(){return this.$store.state.songList},
   num(){return this.$store.state.num},
   isShowIndex(){return this.$store.state.isShowIndex;},
  },
  methods: {
  addPlay(index){
        if(this.myList[index].id!==this.$store.state.songList[0].id){
        this.$store.state.songList.unshift(this.myList[index]);
        this.$store.commit("isLikeReset")
        this.$store.commit("numReset")
       this.$store.state.isPlay=true;
       
        }
      },

}
}
</script>

<style>


.mylist-title{
  margin-left: 0px;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 5px 5px 5px;
  color: black;
  border-bottom: 1px #eee solid;
}
.mine{
  position: absolute;
  height: 100%;
  width: 100%;
  

}

</style>