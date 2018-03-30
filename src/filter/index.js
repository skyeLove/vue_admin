//将数据菜单栏处理层级关系
const muenChild = (value) => {
    let model=[]
    if(value){
        let tempData=value.sort((a,b)=>a.sort - b.sort)
        tempData.forEach((value)=>{
            if(!value.parents){
                model.push(value)
                value.children=[]
                tempData.forEach((item)=>{
                    if(value.menuId==item.parents){
                        value.children.push(item)
                    }
                })
            }
        })
    }
    return model;
}


export default {
    muenChild
}
