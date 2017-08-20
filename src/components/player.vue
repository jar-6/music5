<template>
<div class="player">
  
  <img v-bind:src="isShowWeather?weatherNowImg():songNowImg()" class="bg-cd blur20"/>
  <div class="player-header">
    <img class="back-icon" src="./../assets/img/icon-back.png" @click="showIndex"/>
    <p>{{songNowName}}</p>  
    <img class="icon-weather" v-bind:src="weatherNowIcon()" @click="showWeather"/> 
  </div>


   

  <p class="weather up-cd"  v-if="isShowWeather">{{city}}天气</p>


  <div class="circle-div">
    


    <div class="mask">
      <img class="cd" v-bind:src="isShowWeather?weatherNowImg():songNowImg()"/><!-- v-bind:src="songNowImg()" -->
      <img 
        class="icon-like" 
        v-bind:src="isLike?like:unlike" 
        @click="addMyList2"
        />
    </div>
    <div class="cir black" id="cir-back0"></div>
    
    <div class="cir black" id="cir-back1" v-show="degree<180"></div><!-- green left half-->
    <div class="cir" id="cir-right" v-show="degree>=180"></div><!-- pink half-->
    <div class="cir" id="cir-left" 
    v-bind:style='{transform:"rotate("+degree+"deg)"}'
    >
  </div>
    <div class="button">
      <img src="../assets/img/icon-pre-white.png" @click="pre"/>

      <img 
      v-bind:src="isPlay?srcPauseWhite:srcPlayWhite"
      @click="playPause"/>
      <img src="../assets/img/icon-next-white.png" @click="next"/>
    </div>


  </div>


      <div class="weather down-cd"  v-if="isShowWeather&&weather.length!==0">
    <p>{{weather.type}}</p>
  <p>{{weatherLow}}~{{weatherHigh}}</p>
  <p>{{weather.fengxiang}} {{weatherWind}}</p>
   </div>

         <p class="down-cd" v-if="!isShowWeather">{{songNowTime}} /{{songAllTime}}</p>

</div>
</template>

<script>

export default {
  name: 'player',
  data() {

    return {

      like:require("../assets/img/icon-like.png"),
      unlike:require("../assets/img/icon-unlike.png"), 
      isLike:false,
      isOverHalf:false,
      weatherList:[],
      isShowWeather:false,
    };
  },
  computed: {
    num(){return this.$store.state.num},
     degree(){return this.$store.state.songNowTimeRaw/this.$store.state.songAllTimeRaw*360},
    songNowImg(){return this.$store.state.songNowImg},
 weatherNowImg(){return this.$store.state.weatherNowImg},
 weatherNowIcon(){return this.$store.state.weatherNowIcon},
    songNowName(){return this.$store.state.songList[this.num].name},
    songNowSinger(){return this.$store.state.songList[this.num].singer},
    songNowTime(){return this.$store.state.songNowTime;},
    songAllTime(){return this.$store.state.songAllTime;},
    srcPlayWhite(){return this.$store.state.srcPlayWhite},
    srcPauseWhite(){return this.$store.state.srcPauseWhite},
    isPlay(){return this.$store.state.isPlay},
    songAllTimeRaw(){return this.$store.state.songAllTimeRaw},
        city(){return this.$store.state.city},
    weather(){return this.$store.state.weather},
    weatherWind(){
      return this.$store.state.weather.fengli.substring(this.$store.state.weather.fengli.length-5,this.$store.state.weather.fengli.length-3)
    },
    weatherLow(){
      return this.$store.state.weather.low.substring(2,this.$store.state.weather.low.length)
    },
    weatherHigh(){
      return this.$store.state.weather.high.substring(2,this.$store.state.weather.high.length)
    },
/*        weatherNowImg(){
      return "static/"+this.$store.state.weather.type.substring(this.$store.state.weather.type.length+1)+".jpg"
    },*/
  },
  methods: {
    next(){
      this.$store.commit("numMinus")
    },
        pre(){
      this.$store.commit("numPlus")
    },
        playPause(){
this.$store.commit("togglePlayState");
    },
    showIndex(){
      this.$store.state.isShowIndex=true;
      this.$store.state.isShowPlayer=false;
      this.$store.state.isShowFooter=true;
    },
    overHalf(){

    },
    addMyList2(){
      this.$store.commit("addMyList");
      this.isLike=this.$store.state.songList[this.num].isLike;
      

    },
    toggleLike(){
      this.isLike=false;
    },
showWeather(){this.isShowWeather=!this.isShowWeather;

}
  },
  watch:{
  songNowName:'toggleLike',

  },
  created: function (){

console.log('readyWeather');
      this.$http.jsonp('http://ip.chinaz.com/getip.aspx', 
        {
          params: {
            jsonp: 'callback',
          }
        }
      ).then(
        function(res){

          var cityname=res.data.address.split("市")[0];
          this.$store.state.city=cityname;
          this.$http.jsonp('http://wthrcdn.etouch.cn/weather_mini', 
            {
              params: {
                city: cityname,
              }
            }
          ).then(
              function(res){
console.log(this.$store.state.weather.type.slice(-1));
                this.$store.state.weather=res.data.data.forecast[0];
               },
              function(){console.log('no')}
          );
        },
            function(){console.log('no')}
      );
     
  },
  
 
}

</script>
<style>
.circle-div p{
  position: absolute;
  display: block;
  z-index: 500;
  left: 50%;
  margin-left:-60px; 
  width: 120px;
  font-size: 25px;
  color: white;
}


.player{
  overflow: hidden;
  background-color: black;/*change*/
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 20;
}
.player-header{
  width: 100%;
  height: 75px;

  top: 0;

/*  box-shadow:0px 2px 10px rgba(0,0,0,0.3);*/
  position: relative;
  z-index: 20;
}
.player-header img {
  height: 50px;
  width: 50px;
  top:12px;
  
  position: absolute;
  display: inline-block;
}
.icon-back{
  left: 10px;
}
.icon-weather{
  right: 10px;
}
.player-header p{
  font-size: 35px;
  width: 79%;
  /*margin-top: 10px;*/
  margin: 20px auto;
  /* border: 1px solid;*/
  color: white;
}
.circle-div{
  height:460px;
  width:460px;
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -230px;
}
.mask img{
  position:absolute;
  z-index:150;
  display: inline-block;
  top: 50%;
  left: 50%;
}
.icon-like{
  margin-top:-55px;
  margin-left: -55px;
  height:110px;
  width:110px;
  }
.cd{
  height:100%;
  width:100%;
    margin-top:-50%;
  margin-left: -50%;
  border-radius: 50%;

    z-index:0;
  box-shadow: 0px 0px 100px rgba(0,0,0,1) 
}
.up-cd{
  top: 130px;
  width: 300px;

  font-size: 30px;
    font-weight: bold;
    position: absolute;

}
.down-cd{

  top: 680px;
  left: 50%;
  margin-left: -180px;
  display: block;
  height: 600px;
}

.up-cd,.down-cd{
      position: absolute;
color: white;
   width:100%;
  
     margin-left: -50%;
  left: 50%;
  
  


}
/*.weather-city{
  top:15%;
}
.weather-content{
  top:65%;
}*/

.mask{
  position:absolute;  
  height:97%;
  width:97%;
  margin-left: -48.5%;
  margin-top: -48.5%;
  left: 50%;
  top: 50%;
  z-index:100; 
}

#cir-right{
  position:absolute;
  z-index:30;
  background-color:red;
  clip:rect(0px,460px,460px,230px);
}
#cir-left{
  position:absolute;
  z-index:20;
  background-color:red;
  clip:rect(0px,230px,460px,0px);
}
.black{
  background-color: black;
}
.white{
  background-color: white;
}
/*.back2{
  background-image:url(http://pic13.huitu.com/res/20131012/369336_20131012183623803200_1.jpg) ;
}*/
#cir-back0{
  z-index:0;
  position:absolute;
}
#cir-back1{
  position:absolute;
  z-index:40;
  clip:rect(0px,230px,460px,0px);
background-color: black;
}
.cir{
  position:absolute;
  margin:auto;
  height:100%;
  width:100%;
  border-radius:50%;

}
.rotate{
  transform:rotate(0deg);
  -webkit-animation: circleProgressLoad_right 120s linear 1;
}
@-webkit-keyframes circleProgressLoad_right{
  0%{-webkit-transform: rotate(0deg); }
  100%{-webkit-transform: rotate(360deg);}
}
.button{
  position: absolute;
  top: 630px;
  left: 50%;
  margin-left: -180px;
  z-index: 1000;
}
.button img{
  height: 50px;
  margin: 27px;
}
</style>