<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-input
          v-model="dataForm.key"
          placeholder="菜单名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;"
      row-key="id"
      lazy
      :load="load"
    >
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="菜单标题"
      >
      </el-table-column>

      <el-table-column
        prop="menuSort"
        header-align="center"
        align="center"
        label="菜单排序"
      >
      </el-table-column>
      <el-table-column
        prop="icon"
        header-align="center"
        align="center"
        label="菜单图标"
      >
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
        </template>
      </el-table-column>
      <el-table-column
        prop="component"
        header-align="center"
        align="center"
        label="组件"
      >
      </el-table-column>
      <el-table-column
        prop="permission"
        header-align="center"
        align="center"
        label="权限"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        key: null
      },
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      hasChildren: false
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$store.dispatch('menu/buildTree', { key: this.dataForm.key }).then((resp) => {
        if (resp && resp.code === 200) {
          this.dataList = resp.data
        } else {
          this.dataList = []
        }
        this.dataListLoading = false
      }).catch(() => {
        this.dataListLoading = false
      })
    },
    load (tree, treeNode, resolve) {
      this.$store.dispatch('menu/getChildren', tree.id).then((resp) => {
        if (resp && resp.code === 200) {
          resolve(resp.data)
        }
      })
    }
  }
}
</script>
<style scoped>
.mod-config {
  margin: 20px;
}
</style>