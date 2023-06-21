<!--
 * @Author: wangcy
 * @Date: 2023-06-21 14:05:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-21 14:16:36
 * @Description: 
-->
<template>
    <div id="app">
        <TableTest :table-data="tableData" :columns="tableColumns" :total="pageTotal" :page.sync="current" :limit.sync="size"
            @columns-change="onColumnsChange" @selection-change="onTableSelectionChange" @sort-change="onTableSortChange"
            @search-content="searchContent" @clear-content="clearContent" @pagination="getActList" />
    </div>
</template>

<script>
import TableTest from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        TableTest
    },
    data () {
        return {
            tableData: [
                { desc: '123as', name: '张三', age: 18, sex: '男' },
                { desc: '123as', name: '李四', age: 22, sex: '女' },
                { desc: '123as', name: '王五', age: 10, sex: '男' },
                { desc: '123as', name: '张三', age: 13, sex: '男' },
                { desc: '123as', name: '李四', age: 23, sex: '女' },
                { desc: '123as', name: '王五', age: 14, sex: '男' }
            ],
            tableColumns: [
                {
                    prop: 'name', // 对应列内容的字段名
                    label: '姓名', // 显示的标题
                    width: '', // 对应列的宽度
                    resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
                    show: true, // 展示与隐藏
                    sortable: false // 对应列是否可以排序
                },
                {
                    prop: 'sex', // 对应列内容的字段名
                    label: '性别', // 显示的标题
                    width: '', // 对应列的宽度
                    resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
                    show: true, // 展示与隐藏
                    sortable: false // 对应列是否可以排序
                },
                {
                    prop: 'age', // 对应列内容的字段名
                    label: '年龄', // 显示的标题
                    width: '', // 对应列的宽度
                    resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
                    show: true, // 展示与隐藏
                    sortable: false // 对应列是否可以排序
                },
                {
                    prop: 'desc', // 对应列内容的字段名
                    label: '描述', // 显示的标题
                    width: '', // 对应列的宽度
                    resizable: true, // 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
                    show: true, // 展示与隐藏
                    sortable: false // 对应列是否可以排序
                }
            ],
            pageTotal: 100, // 总条数
            current: 1,
            size: 10
        }
    },
    created () {
        sessionStorage.setItem('table_data', JSON.stringify(this.tableData)) // 保存原始数据
    },
    methods: {
        // 查询表格数据
        searchContent (arr) {
            this.tableData = arr
        },
        // 查询后清空输入框信息
        clearContent () {
            this.tableData = JSON.parse(window.sessionStorage.getItem('table_data'))
        },
        onColumnsChange (columns) {
            this.tableColumns = columns
        },
        onTableSelectionChange (selection) {
            console.log('选中的行：', selection)
        },
        onTableSortChange (sort) {
            console.log('排序的列：', sort.prop)
            console.log('排序的方式：', sort.order)
        },
        // 获取信息
        getActList () {

        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
