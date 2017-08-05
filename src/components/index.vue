<template>
    
    <div class="index">
     

<div class="header">
    <img class="menu-icon" src="../assets/img/icon-menu.png"/>

        <div class="header-tabbar">
        <div>
          <router-link to="/" class="">
          <img class="header-tabbar-icon" src="../assets/img/icon-music-white.png"/>
          
        </router-link>
        </div>

       <div>
          <router-link to="/mine" class="">
          <img class="header-tabbar-icon" src="../assets/img/icon-like-white.png"/>
          
        </router-link>
       </div> 
      </div>

        <img class="search-icon" src="../assets/img/icon-search.png"
        @click="showSearch"
        />
        
     </div> 
  
      <router-view></router-view>
     

    </div>
  
</template>

<script>

export default {
  name: 'index',

  data() {
    return {
      index: ''
    };
  },
  computed: {
   
  },
  methods: {
   showSearch(){
    this.$store.state.isShowSearch=true;
    this.$store.state.isShowIndex=false;
    this.$store.state.isShowPlayer=false;
    console.log(3);
   },
      

},
created: function (){
    console.log('ready');
           this.$http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', 
        {
          params: {
            g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
          },
          jsonp:'jsonpCallback'
        }).then(
        function(res){
          this.$store.state.commendSongList=res.data.data.songList;
          this.$store.state.sliderList=res.data.data.slider;
          this.$store.state.radioList=res.data.data.radioList;

        }
        
        );
     
  },
}
</script>

<style>

.index{
  position: absolute;
  width: 100%;
  z-index: 50;
 
  top: 0;
  
}
 .header{
  height: 75px;
  display: flex;
  box-shadow:0px 2px 10px rgba(0,0,0,0.2);
background-color: rgba(0,0,0,1);
opacity: 1

}
 

  .header div{
     

    width: 40%;
    height: 75px;
    /*margin-top: 10px;*/
   margin: 0px auto;
  
  color: white;
  }
.header img {
  
    height: 50px;
    width: 50px;
    top:12px;
    position: absolute;
    display: inline-block;

   /* margin: 15px 5px;*/

  }
  .header-tabbar{
 display: flex;
 
  }
  .header-tabbar div{
    padding: 0px;
   
    position: relative;
   
    flex:1;
  }
  .header-tabbar-icon{
   
    margin-left: 50%;
    left: -25px;
  
     padding: 0px;
    opacity: 0.5;
    display: inline-block;
  }
  .search-icon{
    right:10px;
  }


  .menu-icon{
    left: 10px;
  }

  .active img{
 font-weight: 900;
  opacity: 1  

  }

a, a:link,a:visited {
  outline: 0;
  text-decoration: none;
  color: black;

}


</style>