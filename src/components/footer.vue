<template>
  <div class="footer">
    <div class="show-div" @click="showPlayer">
      <div class="img-div">
      <img v-bind:src='songNowImg()'/>
      </div>
      <div class="text-div">
      <h3>{{songNowName}}</h3>
      <p>{{songNowSinger}}</p>
      </div>
    </div>
    <div class="icon-div">
      <img 
      @click="playPause"
      v-bind:src="isPlay?srcPause:srcPlay"/>
      <img 
      src="../assets/img/icon-next-black.png"
      @click="next"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      
    }
  },
  computed: {
    num(){return this.$store.state.num},
    srcPlay(){return this.$store.state.srcPlay},
    srcPause(){return this.$store.state.srcPause},
    songNowName(){return this.$store.state.songList[this.num].name},
    songNowSinger(){return this.$store.state.songList[this.num].singer[0].name},
    songNowImg(){return this.$store.state.songNowImg},

    isPlay(){return this.$store.state.isPlay},
  },
  methods: {
    playPause(){
      this.$store.commit("togglePlayState");
    },
    album(){
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', 
        {
          params: {
            albummid: this.albumMid,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          console.log(res)
        },
        function(){alert("没有找到该专辑")}
        );
      },
    searchImg(){
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', 
        {
          params: {
            albummid: this.albumMid,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          this.songNowImg=res
          console.log(res)
        },
        function(){alert("没有找到该封面")}
        );
      },
    showPlayer(){
      this.$store.state.isShowPlayer=true;
      this.$store.state.isShowSearch=false;
      this.$store.state.isShowIndex=false;
      this.$store.state.isShowFooter=false;
    },
    next(){
      this.$store.commit("numMinus")
    }
  },
}
</script>
<style>
.footer{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 75px;
  background-color: white;
  box-shadow:0px -2px 10px rgba(0,0,0,0.3);
  display: flex;
  z-index: 600;
} 
.img-div{
  flex:1;
}
.img-div img{
  position: relative;
  width: 55px;
  height: 55px;
}
.text-div{
  flex:5;
}
.text-div h3{
  top: -10px;
  position: absolute;
}
.text-div p{
  top:40px;
  position: absolute;
}
.show-div{
  flex:2;
  display: flex;
}
.icon-div{
  flex:1;
}
.icon-div img{
  height: 55px;
  top: 5px;
  position: relative;
  padding: 12px
}
</style>