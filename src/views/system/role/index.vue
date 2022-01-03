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
          placeholder="角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button
          type="primary"
          @click="addOrUpdateHandle()"
          v-permission="['role:add']"
        >新增</el-button>
        <el-button
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
          v-permission="['role:del']"
        >批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="16">
        <div>
          <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%;"
            @cell-click="loadMenuByRoleId"
          >
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              label="名称"
            >
            </el-table-column>
            <el-table-column
              prop="description"
              header-align="center"
              align="center"
              label="角色描述"
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
                  @click="addOrUpdateHandle(scope.row.id)"
                  v-permission="['role:edit']"
                >修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="deleteHandle(scope.row.id)"
                  v-permission="['role:del']"
                >删除</el-button>
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
          <!-- 弹窗, 新增 / 修改 -->
          <add-or-update
            v-if="addOrUpdateVisible"
            ref="addOrUpdate"
            @refreshDataList="getDataList"
          ></add-or-update>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold">菜单分配</span>
            <el-button
              style="float: right; padding: 6px 9px"
              type="primary"
              icon="el-icon-check"
              size="mini"
              @click="saveOrUpdateMenuByRoleId"
              v-permission="['role:edit']"
            >保存</el-button>
          </div>
          <div class="text item">
            <el-tree
              :props="props"
              :load="getChildren"
              node-key="id"
              lazy
              show-checkbox
              check-strictly
              :default-checked-keys="checkedKeys"
              @check="menuChange"
              ref="roleTree"
            >
            </el-tree>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import AddOrUpdate from './role-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        key: null
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'hasChildren'
      },
      checkedKeys: [],
      init: false,
      currentRoleId: null
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
      this.$store.dispatch('role/list', { current: this.pageIndex, size: this.pageSize, key: this.dataForm.key }).then((resp) => {
        if (resp && resp.code === 200) {
          const data = resp.data
          this.dataList = data.records
          this.totalPage = data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      }).catch(() => {
        this.dataListLoading = false
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
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('role/delByIds', ids).then((resp) => {
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
      }).catch(() => {

      })
    },

    loadMenu (resolve) {
      this.$store.dispatch('menu/buildTree', {}).then((resp) => {
        if (resp && resp.code === 200) {
          resp.data.map(n => {
            n.hasChildren = !n.hasChildren
          })
          resolve(resp.data)
        }
      })
    },

    getChildren (node, resolve) {
      if (node.level === 0) {
        this.loadMenu(resolve)
      } else {
        this.$store.dispatch('menu/getChildren', node.data.id).then((resp) => {
          if (resp && resp.code === 200) {
            resp.data.map(n => {
              n.hasChildren = !n.hasChildren
            })
            resolve(resp.data)
          } else {
            this.$message.error(data.msg)
          }
        })
      }


    },

    loadMenuByRoleId ({ id }) {
      this.currentRoleId = id
      this.$store.dispatch('menu/getMenuByRoleId', id).then((resp) => {
        if (resp && resp.code === 200) {
          this.checkedKeys = resp.data
          this.init = true
          this.$nextTick(() => {
            this.$refs.roleTree.setCheckedKeys(this.checkedKeys);
          })
        }
      })
    },

    menuChange (menu) {
      if (!this.init) {
        this.$message.error('请先选择角色')
        this.$refs.roleTree.setCheckedKeys(this.checkedKeys)
        return
      }

      if (this.checkedKeys.length === 0) {
        this.checkedKeys.push(menu.id)
        this.$refs.roleTree.setCheckedKeys(this.checkedKeys)
        return
      }

      for (let i = 0; i < this.checkedKeys.length; i++) {
        const index = this.checkedKeys.indexOf(menu.id)
        if (index !== -1) {
          // 存在则删除
          this.checkedKeys.splice(index, 1)
          return
        } else {
          // 不存在则新增
          this.checkedKeys.push(menu.id)
          return
        }
      }

    },

    saveOrUpdateMenuByRoleId () {
      if (!this.currentRoleId) {
        this.$message.error('请先选择角色')
      } else {
        this.$store.dispatch('role/saveOrUpdateMenuByRoleId', { roleId: this.currentRoleId, menuIds: this.checkedKeys }).then((resp) => {
          if (resp && resp.code === 200) {
            // 重新加载权限
            this.$store.dispatch('user/getInfo')
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.el-row {
  margin: 20px;
}
.mod-config {
  margin: 20px;
}
</style>