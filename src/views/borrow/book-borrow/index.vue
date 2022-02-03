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
          placeholder="书名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-cascader
          :options="options"
          v-model="dataForm.categoryId"
          :props="{value: 'id', label: 'categoryName'}"
          :show-all-levels="false"
          placeholder="请选择分类"
          clearable
        >
        </el-cascader>
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
        prop="bookName"
        header-align="center"
        align="center"
        label="书名"
      >
      </el-table-column>
      <el-table-column
        prop="image"
        header-align="center"
        align="center"
        label="图片"
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
        prop="author"
        header-align="center"
        align="center"
        label="作者"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        header-align="center"
        align="center"
        label="分类"
      >
      </el-table-column>
      <el-table-column
        prop="publicationYear"
        header-align="center"
        align="center"
        label="出版年份"
      >
        <template slot-scope="scope">
          <el-tag
            el-tag
            type="info"
          >{{scope.row.publicationYear}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="isbn"
        header-align="center"
        align="center"
        label="isbn"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="价格"
      >
        <template slot-scope="scope">
          <el-tag el-tag>￥{{scope.row.price}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pages"
        header-align="center"
        align="center"
        label="页数"
      >
        <template slot-scope="scope">
          <el-tag
            el-tag
            type="danger"
          >{{scope.row.pages}} 页</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        header-align="center"
        align="center"
        label="库存"
      >
        <template slot-scope="scope">
          {{scope.row.stock === 0 ? '无库存' : scope.row.stock}}
        </template>
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
            @click="borrow(scope.row.id, scope.row.bookName)"
            v-permission="['book-borrow:launch']"
          >借阅</el-button>
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
import { list } from '@/api/library/book'
import { buildCategoryTree } from '@/api/library/category'
import { borrow } from '@/api/borrow/borrow'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        categoryId: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      dialogVisible: false,
      options: []
    }
  },
  mounted () {
    this.getDataList()
    this.buildCategoryTree()
  },

  methods: {
    buildCategoryTree () {
      new Promise(() => {
        buildCategoryTree('').then(resp => {
          if (resp && resp.code === 200) {
            this.options = resp.data
          } else {
            this.options = []
          }
        })
      })
    },
    // 获取数据列表
    getDataList () {
      let categoryId = this.dataForm.categoryId[this.dataForm.categoryId.length - 1]
      this.dataListLoading = true
      new Promise(() => {
        list({ current: this.pageIndex, size: this.pageSize, key: this.dataForm.key, categoryId: categoryId }).then(resp => {
          const data = resp.data
          this.dataList = data.records
          this.totalPage = data.total

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
    // 借阅
    borrow (id, bookName) {
      this.$confirm('您确定借阅《' + bookName + '》这本书吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new Promise(() => {
          borrow(id).then((resp) => {
            if (resp && resp.code === 200) {
              this.$message({
                type: 'success',
                message: '借阅成功!'
              })
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