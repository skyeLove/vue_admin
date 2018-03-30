<template>
  <div>
      <el-table
          style="width: 100%"
          ref="multipleTable"
          stripe
          :data="tableData3"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              label="日期"
              fixed
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              fit="true"
              prop="address"
              label="地址"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              fixed="right"
              prop="address"
              label="地址"
              show-overflow-tooltip>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
    export default {
        name:'roleManage',
        data: function(){
            return{
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                },{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                },{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                },],
                multipleSelection: []
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>
