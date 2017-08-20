<template>
    <div class="commend" v-show="isShowIndex">

      <h5 class="commend-title">推荐</h5>
       <!--  <div class="sliderlist" v-show="sliderList.length!==0">
          
           <img 
              v-bind:src="sliderList[0].picUrl"
              class="radiolist-img"/> 
         
        </div> -->
    <div class="sliderlist" v-if="sliderList.length!==0">
      <transition name="slider">
        <img v-bind:src="sliderList[0].picUrl" class="slider-img" v-show="sliderNum===0||sliderNum===3"/>
      </transition>
      <transition name="slider">
        <img v-bind:src="sliderList[1].picUrl" class="slider-img opacity" v-show="sliderNum===1"/>
      </transition>
      <transition name="slider">
        <img v-bind:src="sliderList[2].picUrl" class="slider-img" v-show="sliderNum===2"/>
      </transition>
    </div>
    <div>
      <div @click='getSliderNum(0)' class="slider-button">
      </div>
      <div @click='getSliderNum(1)' class="slider-button">
      </div>
      <div @click='getSliderNum(2)' class="slider-button">
      </div>
    </div>
        <h5 class="commend-title">电台</h5>
        <div class="radiolist" v-show="radioList.length!==0"> 
          <div class="radiolist-div" v-for="(value,index) in radioList">
            <img v-show="radioList.length!==0"
              v-bind:src="value.picUrl"
              class="radiolist-img"/>
            <p 
              class="radiolist-text"
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
    num3:0
    };
  },
  computed: {
  isShowIndex(){return this.$store.state.isShowIndex;}, 
  radioList(){return this.$store.state.radioList;}, 
  sliderList(){return this.$store.state.sliderList;}, 
  sliderNum(){return this.$store.state.sliderNum;}, 
  },


  methods: {
    getSliderNum(num){
this.$store.state.sliderNum=num;
    },

   
  },
    created: function (){
this.$store.commit("changeSliderNum");
}
}
</script>

<style>
.slider-button{
  position: relative;
  background-color: white;
  height: 15px;
  width: 15px;
  margin: 10px; 
  border-radius: 50%;
  top:-40px;

  display:inline-block;
}
.slider-enter-active,.slider-leave-active{
transition:all 1s linear;
}
.slider-enter{
 transform: translateX(550px);
  }
  .slider-leave-active{
 transform: translateX(-550px);
  }
.sliderlist{
  height: 280px;
}
.slider-img{
  position: absolute;
  height: 280px;
  width: 600px;
  margin-left: -300px;
  display: inline-block;
}
.slider-move{

  animation-name: move;
  animation-duration: 5s;
  animation-timing-function:linear;
  /*animation-iteration-count: infinite;*/
}
@keyframes move{
  0%   {margin-left: -100%;}
  10%  {margin-left: -200%;}
  20%  {margin-left: 0;}
  30%  {margin-left: -100%;}
}

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