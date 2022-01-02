<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item
        label="上级菜单ID"
        prop="pid"
      >
        <el-input
          v-model="dataForm.pid"
          placeholder="上级菜单ID"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单类型"
        prop="type"
      >
        <el-input
          v-model="dataForm.type"
          placeholder="菜单类型"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单标题"
        prop="name"
      >
        <el-input
          v-model="dataForm.name"
          placeholder="菜单标题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="组件"
        prop="component"
      >
        <el-input
          v-model="dataForm.component"
          placeholder="组件"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单排序"
        prop="menuSort"
      >
        <el-input
          v-model="dataForm.menuSort"
          placeholder="菜单排序"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单图标"
        prop="icon"
      >
        <el-input
          v-model="dataForm.icon"
          placeholder="菜单图标"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="链接"
        prop="path"
      >
        <el-input
          v-model="dataForm.path"
          placeholder="链接"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="权限"
        prop="permission"
      >
        <el-input
          v-model="dataForm.permission"
          placeholder="权限"
        ></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        pid: '',
        type: '',
        name: '',
        component: '',
        menuSort: '',
        icon: '',
        path: '',
        permission: '',
        deleted: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: ''
      },
      dataRule: {
        pid: [
          { required: true, message: '上级菜单ID不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '菜单类型不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单标题不能为空', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '组件不能为空', trigger: 'blur' }
        ],
        menuSort: [
          { required: true, message: '菜单排序不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '菜单图标不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '链接不能为空', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '权限不能为空', trigger: 'blur' }
        ],
        deleted: [
          { required: true, message: '0-未删 1-已删不能为空', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '创建人不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateBy: [
          { required: true, message: '修改人不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '修改时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$store.dispatch('menu/getById', this.dataForm.id).then((resp) => {
            if (resp && resp.code === 200) {
              resp = resp.data
              this.dataForm.pid = resp.pid
              this.dataForm.type = resp.type
              this.dataForm.name = resp.name
              this.dataForm.component = resp.component
              this.dataForm.menuSort = resp.menuSort
              this.dataForm.icon = resp.icon
              this.dataForm.path = resp.path
              this.dataForm.permission = resp.permission
              this.dataForm.deleted = resp.deleted
              this.dataForm.createBy = resp.createBy
              this.dataForm.createTime = resp.createTime
              this.dataForm.updateBy = resp.updateBy
              this.dataForm.updateTime = resp.updateTime
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('menu/saveOrUpdate', {
            'id': this.dataForm.id || undefined,
            'method': this.dataForm.id ? 'put' : 'post',
            'pid': this.dataForm.pid,
            'type': this.dataForm.type,
            'name': this.dataForm.name,
            'component': this.dataForm.component,
            'menuSort': this.dataForm.menuSort,
            'icon': this.dataForm.icon,
            'path': this.dataForm.path,
            'permission': this.dataForm.permission,
            'deleted': this.dataForm.deleted,
            'createBy': this.dataForm.createBy,
            'createTime': this.dataForm.createTime,
            'updateBy': this.dataForm.updateBy,
            'updateTime': this.dataForm.updateTime
          }).then((resp) => {
            if (resp && resp.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
