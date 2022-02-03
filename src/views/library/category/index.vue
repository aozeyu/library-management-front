<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-button @click="getDataList()">刷新</el-button>
        <el-button
          type="primary"
          @click="addOrUpdateHandle(undefined, 'add')"
          v-permission="['bookCategory:add']"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      ref="department"
      style="width: 100%;"
      row-key="id"
    >
      <el-table-column
        prop="categoryName"
        header-align="center"
        label="分类名称"
      >
      </el-table-column>
      <el-table-column
        prop="categoryCode"
        header-align="center"
        align="center"
        label="分类编码"
      >
      </el-table-column>
      <el-table-column
        prop="seq"
        header-align="center"
        align="center"
        label="同一层级分类排序排序"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id, 'add')"
            v-permission="['bookCategory:add']"
          >新增
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id, 'update')"
            v-permission="['bookCategory:edit']"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.children && scope.row.children.length > 0"
            @click="deleteHandle(scope.row.id, scope.row.categoryName)"
            v-permission="['bookCategory:del']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './bookcategory-add-or-update'
import { buildCategoryTree, delByIds } from '@/api/library/category'
export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      new Promise(() => {
        buildCategoryTree(this.dataForm.key).then(resp => {
          if (resp && resp.code === 200) {
            this.dataList = resp.data
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id, action) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, action)
      })
    },
    // 删除
    deleteHandle (id, categoryName) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[${categoryName}]分类进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise(() => {
          delByIds(ids).then(resp => {
            if (resp && resp.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }).catch(() => {

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