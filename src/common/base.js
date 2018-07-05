//全局
exports.install = function (Vue, options) {
    //过滤树接口
    Vue.prototype.forData =(object,value)=>{
            value.children=[]
            object.forEach((item)=>{
                if(value.id==item.pId){
                    value.children.push(item)
                    Vue.prototype.forData(object,item)
                }
            })
            if(value.children.length==0)  delete value.children;
    };
    //设置slocalStorage
    Vue.prototype.setlocalStorage = (key,value)=>{
        if(value)  window.localStorage.setItem(key,value);
    };
    //获取localStorage
    Vue.prototype.getlocalStorage = (key)=>{
        const k=window.localStorage.getItem(key); return k
    };
    //时间转化
    Vue.prototype.dateFormat =(dateTime,type)=>{
        try {
            //判断时间为1970-01-01是为空
            if (dateTime==null || dateTime=='' || dateTime=="undefined"){
                return dateTime;
            }
            let formatDate = new Date(dateTime);
            let formatTime=''
            let yy = formatDate.getFullYear();
            let mm = formatDate.getMonth() + 1;
            let dd = formatDate.getDate();
            let hh = formatDate.getHours();
            let min = formatDate.getMinutes();
            let ss=formatDate.getSeconds();
            if (mm >= 1 && mm <= 9) {
                mm = "0" + mm;
            }
            if (dd >= 0 && dd <= 9) {
                dd = "0" + dd;
            }
            if (hh >= 0 && hh <= 9) {
                hh = "0" + hh;
            }
            if (min >= 0 && min <= 9) {
                min = "0" + min;
            }
            if (ss >= 0 && ss <= 9) {
                ss = "0" + ss;
            }
            switch(type){
                case 0:
                    formatTime=yy+mm+dd+hh+min+ss;
                    break;
                case 1:
                    formatTime = yy+"-"+mm+"-"+dd;
                    break;
                case 2:
                    formatTime = yy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+ss;
                    break;
                case 3:
                    formatTime = yy+"年"+mm+"月"+dd+"日"+hh+"时"+min+"分"+ss+"秒";
                    break;
                case 4:
                    formatTime = yy+"_"+mm+"_"+dd+" "+hh+"_"+min+"_"+ss;
                    break;
                case 5:
                    formatTime = mm+"/"+dd;
                    break;
                default:
                    formatTime = yy+"-"+mm+"-"+dd+" "+hh+":"+min+":"+ss;
            }
            return formatTime;
        } catch (e) {
            return dateTime;
        }

    };
};
