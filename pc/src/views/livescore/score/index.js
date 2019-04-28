import Vue from 'vue';
import template from './index.template';
import './index.scss';
import 'components/scoreColumn';

export default Vue.component('score',{
   data(){
       return{

       }
   },
    template,
   props:{
        time:{default: ''},
       matchList:{default: ()=>[]}
   },
   methods:{

   },
   created(){

   }
});