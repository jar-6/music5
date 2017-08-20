// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
/*import axios from 'axios'
Vue.prototype.$http = axios*/
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
Vue.config.productionTip = false


const store = new Vuex.Store({
  state:{
    srcPlay:require("./assets/img/icon-play-black.png"),
    srcPause:require("./assets/img/icon-pause-black.png"), 
    srcPlayWhite:require("./assets/img/icon-play-white.png"),
    srcPauseWhite:require("./assets/img/icon-pause-white.png"), 
    songNowImg(){
      return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+this.$store.state.songList[this.$store.state.num].album.mid+".jpg"
    },
        weatherNowImg(){
      return "static/"+this.$store.state.weather.type.slice(-1)+".jpg"
    },
    weatherNowIcon(){
      return "static/"+this.$store.state.weather.type.slice(-1)+".png"
    },
    isShowIndex:true,
    isShowFooter:true,
    isShowPlayer:false,
    isShowSearch:false,
    num:0,
    sliderNum:0,
    resnum:'',
    songNowTime:'00:00',
    songAllTime:'00:00',
    songAllTimeRaw:'',
    songNowTimeRaw:'',
    songList:[
      {
        name:'To my dear Deer',
        id:'107192078',
        singer:"轮轮",
        isLike:false,
        album:{mid:'003RMaRI1iFoYd'}
      }
    ],
    songResultList:[],
    singerResultList:[],
    radioList:[],
    sliderList:[],
    commendSongList:[],
   
    singerInfo:{},
    myList:[
      {
        name:"",
        id:"",
        singer:"" 
      }],
    isPlay:true,
    city:'',
    date:'',
    weather:{
      type:"晴",

      low:'',
      high:''
    },
  },

  mutations:{
/*changeSliderNum(state){
  setInterval(function(){
    if(state.sliderNum<=3){
      state.sliderNum=state.sliderNum+0.5;
    }
    else{state.sliderNum=1}
  }
    ,5000)
},*/
changeSliderNum(state){
  setInterval(function(){
setTimeout(function(){state.sliderNum=1},0);
setTimeout(function(){state.sliderNum=2},5000);
setTimeout(function(){state.sliderNum=0},10000)
  },15000)
},
    numPlus(state){
      
      if(state.num<state.songList.length-1){state.num++}
      else{console.log('已经是第一首了~')}
       

    },
    numMinus(state){
      if(state.songList.length!==1){
      if(state.num>0){state.num--}
      else{
        state.resnum++;
        state.songList.unshift(state.songResultList[state.resnum])
        state.num=0;}
         }
    },
    numReset(state){state.num=0},
    listReset(state,list){state[list]=[]},
    isLikeReset(state){state.songList[0].isLike=false},
    addList(state,resnum){
      state.songList.unshift(state.songResultList[resnum]);
      state.resnum=resnum
    },
    addMyList(state){
      if(!state.songList[0].isLike){
        state.songList[0].isLike=true;//!
        state.myList.unshift(state.songList[0]);
        console.log(state.songList[0].isLike,state.myList)
      }
      else{console.log('already liked')}
    },

    storeTimeUpDate(state,timeArr){
      function numToTime(rawTime){
        var unit=rawTime%60;
        var decade=(rawTime-unit)/60;
        if(unit<10){unit=0+unit.toString()};
        if(decade<10){decade=0+decade.toString()};
        return decade+':'+unit;
      }
      state.songNowTimeRaw=timeArr[0];
      state.songNowTime=numToTime(timeArr[0]);
      state.songAllTimeRaw=timeArr[1];
      state.songAllTime=numToTime(timeArr[1]);
      console.log()
    },

    togglePlayState(state){
      state.isPlay=!state.isPlay;
      console.log(state.isPlay)
    },
  },
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


