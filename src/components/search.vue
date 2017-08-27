<template>
  <div class="search" v-show="isShowSearch">
    <div class="search-header">
      <router-link to="/">
      <img 
        class="back-icon" 
        src="./../assets/img/icon-back.png"
        @click="showIndex(),toCancel()"/>
           </router-link>
      <input 
        placeholder=" 搜索歌曲"  
        v-model="songkey" 
        @keydown="search"
        >
        <img  
          class="cancel-icon" 
          src="./../assets/img/icon-cancel.png"
          @click="toCancel"
          v-show="isShowCancel"/>
      </input>
      <router-link to="/songResult">
      <img 
        class="search-icon" 
        src="./../assets/img/icon-search.png"
        @click="search" /> 
          </router-link>
    </div>

<div class="search-tabbar" v-if="songResultList.length!==0">

        <div>
          <router-link to="/songResult" class="search-tabbar-text">
          单曲
        </router-link>
        </div>
        <div>
          <router-link to="/singerResult" class="search-tabbar-text">
          歌手
        </router-link>
        </div>
<!--         <div>
          <router-link to="/albumResult" class="search-tabbar-text">
          专辑
        </router-link>
        </div> -->

    </div>

      <div class="search-result">
      <router-view></router-view>
      </div>
  
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      
      songkey:"",
      result:null,
      weatherList:[],
      singer:null
    }
  },
  computed: {
    num(){return this.$store.state.num},
    songList(){return this.$store.state.songList},
    songResultList(){return this.$store.state.songResultList}, 
    singerResultList(){return this.$store.state.singerResultList},
    isShowCancel(){return this.songkey},
    isShowSearch(){return this.$store.state.isShowSearch}
  },
  methods: {
  
    showIndex(){
      this.$store.state.isShowIndex=true;
      this.$store.state.isShowSearch=false;
      this.$store.state.isShowFooter=true;
    },
    
    toCancel(){
      this.songkey="";
      this.song=null;
      this.$store.commit("listReset",'songResultList');
      this.$store.commit("listReset",'singerResultList');
     
    },
    
  search(songkey){
   
    songkey=this.songkey
    this.searchSong(songkey);
    this.searchSinger(songkey);},   

searchSong(songkey){
      
      this.$http.jsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', 
        {
          params: {
            is_xml: 0,
            format: 'jsonp',
            ct:24,
            qqmusic_ver:1298,
            new_json:1,
            t:0,
            aggr:1,
            cr:1,
            catZhida:1,
            lossless:0,
            flag_qc:0,
            remoteplace:'txt.yqq.center',
            w:songkey,
            p:1,
            n:11

          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          
          this.$store.state.songResultList=res.data.data.song.list
          
        },
        function(){alert("没有找到该歌曲")}
        );
        
      },
 

searchRain(){
  this.$http.jsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', 
    {
      params: {
        is_xml: 0,
        format: 'jsonp',
        ct:24,
        qqmusic_ver:1298,
        new_json:1,
        t:0,
        aggr:1,
        cr:1,
        catZhida:1,
        lossless:0,
        flag_qc:0,
        remoteplace:'txt.yqq.center',
        w:'钢琴',
        p:1,
        n:100
      },
    jsonp:'jsonpCallback'
    }).then(
    function(res){
      this.$store.state.songResultList=res.data.data.song.list;
      for(var j=0;j<this.$store.state.songResultList.length;j++){
        var nowId=this.$store.state.songResultList[j].id
        var nowName=this.$store.state.songResultList[j].name
       
        this.$http.jsonp('https://c.y.qq.com/rcmusic/fcgi-bin/fcg_iphone_music_rec_songlist', 
        {
          params: {
            format:'jsonp',
            cid:338,
            ct:20,
            uin:10000,
            g_tk:1885845528,
            songid:nowId//'1761007''100893820'
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          var list=res.data
          console.log('test',list);
          for(var i=0;i<list.length;i++){
            if(list[i].dissname.indexOf('钢琴')!==-1){
              console.log('testTrue',list[i]);
              this.weatherList.push(nowId);
              break;
            }
          }
        })

      }

        },
        function(){alert("没有找到该歌曲")}
        );
      },




      searchSinger(songkey){
     
      this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', 
        {
          params: {
            is_xml: 0,
            format: 'jsonp',
            key: songkey,
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          this.$store.state.singerResultList=res.data.data.singer.itemlist
         
        },
        
        );
      },


      

  


      

    },
  }
</script>

<style>
.search{
  position: absolute;
  height: 100%;

}



.search{
  height: 100%;
  width: 100%;
  
  z-index: 100;
  position: absolute;
}
/*.header{
  position: absolute;
  width: 100%;
}*/

  .search-header {
    width: 100%;
    height: 75px;
    display: flex;
  
   background-color: black;
      box-shadow:0px 2px 10px rgba(0,0,0,0.);
position: absolute;
    z-index: 20;
  }


  .search-header input{
     
font-size: 30px;
    width: 440px;
    /*margin-top: 10px;*/
   margin: 15px 50px 15px 80px;
   border-radius: 10px;
   outline: none;
   /* border: 1px solid;*/
  
  }
.search-icon, .back-icon{
 /* border: 1px solid;*/
    height: 50px;
    width: 50px;
    top:12px;
    position: absolute;
    display: inline-block;
   /* margin: 15px 5px;*/

  }
  .search-icon{
    right:10px;

  }
  .back-icon{
    left: 10px;
  }

 .cancel-icon{
  width: 30px;
  height: 30px;
  position: relative;
  right: 90px;
  top: 23px;
 }

  .search-tabbar{
    display: flex;
  background-color: white;
  height: 55px;
  top: 75px;
    position: relative;
  }

  .search-result{

  position: relative;
height: 500px;
  top: 75px;
  background-color: white;
}
.result-title{
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 10px 15px;
  color: black;
  background-color: #eee;
}
.result-song,.result-singer,.my-list{
margin-top: 30px;
border-bottom: 1px #eee solid;
position: relative;
text-align: left;
}
.result-normal{

 
  margin: 0px;
  padding: 0px 5px;
 
 width: 90%;
 height: 100%;
  display: inline-block;
  font-size: 25px;

  
}
.result-song img,.result-singersong img,.my-list img{
  width: 25px;
  height: 25px;
  position: absolute;
 right: 40px;
 top: 4px;
} 
  .search-tabbar div{
    flex:1;
    
    font-size: 18px;
  
    position: relative;
  }
  .search-tabbar-text{

    width: 100%;
    height: 100%;
position: absolute;
top: 0px;
left: 0px; 
padding: 10px;
font-size: 25px;
display: inline;
  }
  .active{
 font-weight: 900;
  border-bottom: 2px red solid;  

  }

a, a:link,a:visited {
  outline: 0;
  text-decoration: none;
  color: black;

}
</style>