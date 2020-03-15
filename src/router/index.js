import Vue from 'vue'
import Router from 'vue-router'
import CurrentPositionPage from '@/pages/CurrentPositionPage'
import SearchPositionPage from '@/pages/SearchPositionPage'

Vue.use(Router);

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'CurrentPositionPage',
            component: CurrentPositionPage
        },
        {
            path: '/search',
            name: 'SearchPositionPage',
            component: SearchPositionPage
        }
    ]

})
 