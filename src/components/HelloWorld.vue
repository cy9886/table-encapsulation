<!--
 * @Author: wangcy
 * @Date: 2023-06-21 14:05:50
 * @LastEditors: 
 * @LastEditTime: 2023-06-21 14:07:57
 * @Description: 
-->
<template>
    <div class="hello">
        <!--操作按钮-->
        <el-row :gutter="20" class="btn-operation">
            <el-col :span="5">
                <el-switch v-model="switchValue" active-text="远程搜索" inactive-text="本地搜索" :active-value="1" :inactive-value="0" />
            </el-col>
            <el-col :span="6">
                <el-input v-model="tableContent" placeholder="请输入内容" @keyup.native.enter="searchContent">
                    <el-button slot="append" icon="el-icon-search" @click="searchContent" />
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-dropdown trigger="click">
                    <el-button icon="el-icon-s-operation" size="mini">列设置</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <span class="title">列设置</span>
                        <el-tree draggable :data="columns" :props="defaultProps" :allow-drop="allowDrop" @node-drop="handleDrop">
                            <span slot-scope="{ node, data }" class="tree-table-setting">
                                <el-switch v-model="data.show" @change="saveTableColumns" />
                                <span>{{ node.label }}</span>
                            </span>
                        </el-tree>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>

        <!--表格-->
        <div>
            <el-table ref="table" :key="tableKey" :data="tableData" :height="tableHeight" :row-style="{ height: '40px' }"
                :cell-style="{ borderRight: 'none' }"
                :header-cell-style="{ height: '40px', padding: 0, background: '#f6f8fa', color: '#333' }" border size="mini"
                tooltip-effect="dark" highlight-current-row @row-click="handelTableClick"
                @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" />
                <template v-for="item in columns">
                    <el-table-column v-if="item.show" :key="item.prop" show-overflow-tooltip :prop="item.prop"
                        :sortable="item.sortable" :label="item.label" :width="item.width" :resizable="item.resizable">
                        <template slot-scope="scope">
                            <span>{{ scope.row[item.prop] }}</span>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column />
            </el-table>
            <el-pagination class="pagination-container" :background="background" :current-page.sync="currentPage"
                :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
export default {
  props: {
    // 控制列
    columns: {
      type: Array,
      default: () => []
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 列表总数
    total: {
      required: true,
      type: Number
    },
    // 当前页
    page: {
      type: Number,
      default: 1
    },
    // 每页展示数量
    limit: {
      type: Number,
      default: 20
    },
    // 每页展示数量
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 操作项
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 分页背景
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表格key
      tableKey: 1,
      // 默认表格高度
      tableHeight: 300,
      // 列设置中 tree配置
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableContent: '', // 搜索的表格内容

      switchValue: 0 // 远程/本地搜索按钮控制 0本地 1远程

    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  watch: {
    'tableContent'(val) {
      if (!val) { // 清空搜索项
        this.$emit('clear-content')
      }
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    // 解决操作之后表格抖动的问题
    this.$refs.table.doLayout()
  },
  methods: {
    /**
      * @author: wangcy
      * @description: 搜索表格内容
      * 1为远程(后台搜索) 0为本地搜索
      */
    searchContent() {
      if (this.switchValue === 0) { // 本地搜索
        const search = this.tableContent
        const arr = this.tableData.filter(item => {
          return Object.keys(item).some(key => {
            if (String(item[key]).toLowerCase().indexOf(search) > -1) { // 搜索到相关信息
              return item
            }
          })
        })
        this.$emit('search-content', arr)
      } else { // 远程搜索
        console.log('------远程搜索---------')
      }
    },
    init() {
      // 判断本地是否有表格配置数据 ？ 加载 ： 忽略
      // 获取表格数据
      // 重设表格高度
    },
    allowDrop(draggingNode, dropNode, type) {
      // 仅允许Tree节点上下拖动
      return type !== 'inner'
    },
    // Tree 拖动时更新表格
    handleDrop() {
      this.tableKey++
      // 保存表格配置
      this.saveTableColumns()
    },
    // 重置表格列设置
    resetTable() {
      // ... 忽略
    },
    // 显示隐藏切换 && 保存表格配置
    saveTableColumns() {
      // setStorage 封装了 localStorage
      //   window.setStorage('clueTable', this.columns)
      window.sessionStorage.setItem('clueTable', this.columns)
    },
    // 选中表格行
    handelTableClick(row) {
        console.log(row);
      // ... 省略业务逻辑
    },
    // table多选操作
    handleSelectionChange(val) {
        console.log(val);
      // ... 省略业务逻辑
    },
    // 页码切换
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    // 每页展示数量切换
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.btn-operation {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.pagination-container {
  background: #fff;
  padding: 20px 16px;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>