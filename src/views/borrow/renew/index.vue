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
          placeholder="参数名"
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
    >
      <el-table-column
        prop="borrowId"
        header-align="center"
        align="center"
        label="借阅订单号"
      >
      </el-table-column>
      <el-table-column
        prop="bookName"
        header-align="center"
        align="center"
        label="封面"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.image"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="bookName"
        header-align="center"
        align="center"
        label="书名"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态 0-审批中 1-同意续借 2-拒绝续借"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'info' : scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.status === 0 ? '审批中' : scope.row.status === 1 ? '同意续借' : '拒绝续借'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="renewTime"
        header-align="center"
        align="center"
        label="续借时间"
      >
      </el-table-column>
      <el-table-column
        prop="approvalTime"
        header-align="center"
        align="center"
        label="审批时间"
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
            @click="approval(scope.row.id,scope.row.bookName, 1)"
            v-permission="['renew:approve']"
            :disabled="scope.row.status !== 0"
          >同意</el-button>
          <el-button
            type="text"
            size="small"
            @click="approval(scope.row.id,scope.row.bookName, 2)"
            v-permission="['renew:approve']"
            :disabled="scope.row.status !== 0"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import { list, approval } from "@/api/borrow/renew";
export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      new Promise(() => {
        list({ current: this.pageIndex, size: this.pageSize, key: this.dataForm.key }).then((resp) => {
          if (resp && resp.code === 200) {
            const data = resp.data
            this.dataList = data.records
            this.totalPage = data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },

    approval (id, bookName, status) {
      // 状态 0-审批中 1-同意续借 2-拒绝续借
      this.$confirm(`您确定${status === 1 ? '同意' : '拒绝'}续借《${bookName}》这本书吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise(() => {
          approval({ id: id, status: status }).then((resp) => {
            if (resp && resp.code === 200) {
              this.$message({
                type: 'success',
                message: '审批成功!'
              })
              this.getDataList()
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