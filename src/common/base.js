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
    //设置slocalStorage
    Vue.prototype.setlocalStorage = function (key,value){
        if(value)  window.localStorage.setItem(key,value);
    };
    //获取localStorage
    Vue.prototype.getlocalStorage = function (key){
        const k=window.localStorage.getItem(key); return k
    };

};
