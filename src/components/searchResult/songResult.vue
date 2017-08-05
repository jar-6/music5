<template>
  <div class="song-result">
   <div 
        class="result"
        v-if="songResultList!==[]">
        
        <div
        class="result-song"
          
        v-for="(value,index) in songResultList">
          <p class="result-normal"
          @click="addPlay(index)">{{value.title}}</p>
          <img 
          class="search-play-icon" 
          v-bind:src="srcPlay"
          
          v-show="songResultList[index].id===songList[num].id"
       />
          
        </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'songResult',
  data() {
    return {
    
    };
  },
  computed: {
    num(){return this.$store.state.num},
    resnum(){return this.$store.state.resnum},
    songList(){return this.$store.state.songList},
    songResultList(){return this.$store.state.songResultList},
    srcPlay(){return this.$store.state.srcPlay},
  },
  methods: {
 addPlay(index){
        
        this.$store.commit("addList",index)
        this.$store.commit("isLikeReset")
        this.$store.commit("numReset")
       this.$store.state.isPlay=true;
        console.log("addPlay",this.$store.state.isPlay);
      },
    showIndex(){
      this.$store.state.isShowIndex=true;
      this.$store.state.isShowSearch=false;
      this.$store.state.isShowFooter=true;
    },
    toggleCancel(){
      this.isShowCancel=!this.isShowCancel;
    },
    toCancel(){
      this.songkey="";
      this.song=null;
    },
    
          

  }
}
</script>

<style>


</style>
