<template>
   <div>
       {{a}}
   </div>
</template>
<script>
    import * as api from "../common/commonApis"
    export default {
        name: "menuManage",
        data(){
            return{
               a:'12331'
            }
        },
        computed: {
             
        },
        methods:{
            getCollapse(){
                this.showCollapse=!this.showCollapse
            }
        }
    }
</script>

<style  scoped>

</style>
