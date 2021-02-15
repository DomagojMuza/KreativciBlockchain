import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import error from '@/components/Error'
import ShortTales from "../../../build/contracts/ShortTales.json";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tales',
    name: 'About',
    beforeEnter: guardMyroute,
    component: () => import('../views/About.vue')
  },
  {
    path: '/tales/:id',
    name: 'ViewTale',
    beforeEnter: guardMyroute,
    component: () => import('../views/ViewTale.vue')
  },
  {
    path: '/fanart',
    name: 'FanArt',
    beforeEnter: guardMyroute,
    component: () => import('../views/ViewFanArt.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

async function guardMyroute(to, from, next)
{
  
   if(store.contract === undefined){
     store.connectToMeta()
   }
   const networkId = await window.web3.eth.net.getId()
   console.log(networkId);
   window.web3.eth.getCode(ShortTales.networks[5777].address, (err, res) =>{
    if(err || res === "0x") {
      store.connected = false
      error.fireError("Connect to Rinkeby network")
      next("/")
    }
  })
   if(store.account === undefined){
    let accs = await window.web3.eth.getAccounts();
      store.account = accs[0];
      store.connected = true;
  }
  next()
    
}

export default router
