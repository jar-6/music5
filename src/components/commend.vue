<template>
    
    <div class="commend" v-show="isShowIndex">

      <h5 class="commend-title">推荐</h5>
        <div class="sliderlist" v-show="sliderList.length!==0">
          
            <img 
              v-bind:src="sliderList[0].picUrl"
              class="radiolist-img"/>
           
         
        </div>
        <h5 class="commend-title">电台</h5>
        <div class="radiolist" v-show="radioList.length!==0"> 
          <div class="radiolist-div" v-for="(value,index) in radioList">
            <img v-show="radioList.length!==0"
              v-bind:src="value.picUrl"
              class="radiolist-img"/>
            <p 
              class="radiolist-test"
              @click="">
              {{value.Ftitle}}
            </p>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'commend',

  data() {
    return {
    
    };
  },
  computed: {
  isShowIndex(){return this.$store.state.isShowIndex;}, 
  radioList(){return this.$store.state.radioList;}, 
  sliderList(){return this.$store.state.sliderList;}, 
  },
  

  methods: {
 

}
}
</script>

<style>
.commend{
  

  position: absolute;
  height: 100%;
  width: 100%;


}
.radiolist{
  position: relative;

 width: 100%;
 display: flex;
}
.radiolist-div{

display: inline-block;

  height: 300px;
  position: relative;
  flex:1;
}
.radiolist-div img{
display: inline-block;

 width: 90%;
  position: relative;
}
.commend-title{
  margin-left: 10px;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 5px 5px 5px;
  color: black;
  border-bottom: 1px #eee solid;
}
</style>