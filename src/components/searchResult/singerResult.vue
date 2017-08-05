<template>
  <div class="singerResult">
    <div  class="result" v-if="singerResultList!==[]">
      <div class="result-singer" v-for="(value,index) in singerResultList">
        <p class="result-normal" @click="lookSinger(value.mid)">
          {{value.name}}
        </p>
        <div  v-if='singerInfo.singer_mid===value.mid' class="result-secondary">
          <div class="result-singersong" v-for="(value,index) in singerInfoList">
            <p class="result-normal" @click="addSingerSongPlay(index)">
              {{value.musicData.songname}}
            </p>
           <img 
          class="search-play-icon" 
          v-bind:src="srcPlay"
          v-show="singerInfoList[index].musicData.songid===songList[num].id"/>
          
        </div>
          </div> 
        </div>
      </div>
    </div>
          
  </div>

</template>

<script>
export default {
  name: 'singerResult',
  data() {
    return {
    
    };
  },
  computed: {
     singerResultList(){return this.$store.state.singerResultList},
     singerInfoList(){return this.$store.state.singerInfo.list},
 singerInfo(){return this.$store.state.singerInfo},
   srcPlay(){return this.$store.state.srcPlay},
   songList(){return this.$store.state.songList},
   num(){return this.$store.state.num},
  },
  methods: {
    addSingerSongPlay(index){
        var singerSongObj={
          name:'',
          id:'',
          singer:'',
          album:{mid:''}}
        singerSongObj.name=this.singerInfoList[index].musicData.songname;
        singerSongObj.id=this.singerInfoList[index].musicData.songid;
        singerSongObj.singer=this.singerInfoList[index].musicData.singer;
        singerSongObj.album.mid=this.singerInfoList[index].musicData.albummid;
        this.$store.state.songList.unshift(singerSongObj);
        this.$store.commit("isLikeReset")
        this.$store.commit("numReset")
       this.$store.state.isPlay=true;
        console.log("addPlay",this.$store.state.isPlay);
      },
lookSinger(singerMid){
     // console.log(singerMid)//000kfe022gdaAn
      this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', 
        {
          params: {
           order: 'listen',
        begin: 0,
        num: 8,
        singermid: singerMid,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5page',
        needNewCode: 1,
        from: 'h5',
        _: new Date().getTime()
            
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          
          
    
          this.$store.state.singerInfo=res.data.data;
          ;
          console.log("singerInfoList",this.$store.state.singerInfo.list
);
          })
        },
  }
}
</script>

<style>
.result-secondary{
  background-color: #eee;
    top:20px;
}

.result-singersong{
    position: relative;

  left:20px;
margin-top: 10px;
border-bottom: 1px #fff solid;
position: relative;
text-align: left;

}
</style>