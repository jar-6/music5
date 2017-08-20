<template>
  <div id="app">
   <!--  <img src="./assets/img/bg-rainb.jpg" class="bg-weather"/> -->
    <transition name="toIndex"> 
      <vindex v-show="isShowIndex" class="index"></vindex>
    </transition>
    <vfooter v-show="isShowFooter"></vfooter>
    <transition name="toSearch">
      <vsearch v-show="isShowSearch"></vsearch>
    </transition>  
    <transition name="toPlayer">
      <vplayer v-show="isShowPlayer"></vplayer>
    </transition>
    <audio 
      v-if="this.$store.state.songList!==[]"
      v-bind:src="songSrc"
      @timeupdate="timeUpDate" 
      @ended="next" 
      id="audio"
      autoplay>
    </audio>
  </div>
</template>

<script>
import vindex from './components/index.vue';
import vplayer from './components/player.vue';
import vfooter from './components/footer.vue';
import vsearch from './components/search.vue';
/*import vbody from './components/body.vue';
*/import './assets/css/normaliz.css';
export default {
  name: 'app',
  components:{
    vindex,
    vplayer,
    vfooter,
    vsearch,
   /* vbody*/
  },
  computed: {
    isShowPlayer(){return this.$store.state.isShowPlayer;},
    isShowIndex(){return this.$store.state.isShowIndex;},
    isShowSearch(){return this.$store.state.isShowSearch;},
    isShowFooter(){return this.$store.state.isShowFooter;},
    songList(){return this.$store.state.songList;},
    isPlay(){return this.$store.state.isPlay;},
    numMinus(){return this.$store.state.numMinus;},
    songSrc(num){
      num=this.$store.state.num;
      return 'http://ws.stream.qqmusic.qq.com/'+this.$store.state.songList[num].id+'.m4a?fromtag=46'; 
    },
    
  },
  methods:{
    next(){
      this.$store.commit("numMinus")
    },
    togglePlayMusic(){
    var audio=document.getElementById('audio');
    if(this.$store.state.isPlay){console.log("播放中..");audio.play();}
    else{audio.pause();console.log("暂停中..");}
  },
  timeUpDate(){
 
    var nowTime=parseInt(document.getElementById('audio').currentTime);
    var allTime=parseInt(document.getElementById('audio').duration);
    var timeArr=[nowTime,allTime];
    this.$store.commit('storeTimeUpDate',timeArr);
    console.log()
  },
},
  watch:{
    isPlay:'togglePlayMusic',
    songSrc:'togglePlayMusic'
  },
  }
</script>

<style>

.bg-weather{
  width: 100%;
  height: 75px;
  margin-left: 50%;
  position: absolute;
  left: -50%;
  opacity: 1;

}
.bg-cd{
  height: 100%;
  width: 200%;
  margin-left: -100%;
  position: absolute;
  opacity: 0.6;
}
.blur20 { 
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);    
  filter: blur(20px);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=20, MakeShadow=false);
}
.blur5 { 
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);    
  filter: blur(5px);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);
}
.toPlayer-enter, .toPlayer-leave-active,.toPlayer-leave{
  transform: translateX(600px);
}

.toSearch-enter, .toSearch-leave-active{
  opacity: 0;
}
#app {
  overflow: hidden;
  text-align: center;
  position: absolute;
  margin-top: 60px;
  width: 600px;
  height: 1000px;
  left: 50%;
  margin-left:-300px;
}

</style>
