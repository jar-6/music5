import Vue from 'vue'
import Router from 'vue-router'
import vcommend from '../components/commend'

import vmine from '../components/mine'

import vsongResult from '../components/searchResult/songResult'
import vsingerResult from '../components/searchResult/singerResult'
/*import valbumResult from '../components/searchResult/albumResult'*/


Vue.use(Router)

export default new Router({
	  linkActiveClass: 'active',

  routes: [
    {
      path: '/',
      name: 'commend',
      component:vcommend
    },

            {
      path: '/mine',
      name: 'mine',
      component:vmine 
    },
    {
      path: '/songResult',
      name: 'songResult',
      component:vsongResult 
    },

    {
      path: '/singerResult',
      name: 'singerResult',
      component:vsingerResult 
    },
/*            {
      path: '/albumResult',
      name: 'albumResult',
      component:valbumResult
    },*/
  ]
})
