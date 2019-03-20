<template>
<div class="Pagination">
    <button @click="changeBtn"><span>首页</span></button>
    <button @click="changeBtn"><span>上一页</span></button>
    <button v-if="judge" class="pageBtn"><span>...</span></button>
    <button v-for="(btn,index) in pagebtns" :key="index" :class="['pageBtn',{'currentPage':(currentPage === btn)}]" @click='changeBtn(btn)'>
        <span>{{btn}}</span>
    </button>
    <button @click="changeBtn"><span>下一页</span></button>
</div>
    
</template>

<script>
import $ from 'jquery';
export default {
    name: "Pagination",
    data(){
        return {
            pagebtns: [1,2,3,4,5,'...'],
            currentPage: 1,
            judge: false
        }
    },
    methods: {
        changeBtn(page) {
            if(typeof page != 'number'){
               switch(page.target.innerText){
                   case "上一页": {
                       $('button.currentPage').prev().click()
                       break
                   }
                   case "下一页": {
                       $('button.currentPage').next().click()
                       break
                   }
                   case "首页": {
                       this.pagebtns = [1,2,3,4,5,'...']
                       this.changeBtn(1)
                   }
                   default:
                   return 
               }
               return
            }
            this.currentPage = page
            if(page === this.pagebtns[4]){ 
                this.pagebtns.shift()
                this.pagebtns.splice(4,0,++page)
            }else if(page === this.pagebtns[0] && page > 1){
                this.pagebtns.splice(4,1)
                this.pagebtns.unshift(--page)
            }
            if(page > 4){
                this.judge = true
            }else {
                this.judge = false
            }
            this.$emit('handle',this.currentPage)
        }
    }
    
}
</script>

<style scoped>
.Pagination {
    padding: 6px 20px;
    margin-bottom: 20px;
}
button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
    font-size: 0;    
}
button span {
    font-size: 14px;
}
.pageBtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
    
}

.currentPage {
    color: white;
    background-color: #778087;

}

</style>

