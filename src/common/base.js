//全局js
exports.install = function (Vue, options) {
    //过滤树接口
    Vue.prototype.forData = function (object,value){
            value.children=[]
            object.forEach((item)=>{
                if(value.id==item.pId){
                    value.children.push(item)
                    this.forData(object,item)
                }
            })
            if(value.children.length==0)  delete value.children;
    };
};
