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
        label="名称"
        prop="name"
      >
        <el-input
          v-model="dataForm.name"
          placeholder="名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述"
        prop="description"
      >
        <el-input
          v-model="dataForm.description"
          placeholder="角色描述"
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
        name: '',
        description: '',
        deleted: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: ''
      },
      dataRule: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '角色描述不能为空', trigger: 'blur' }
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
          this.$store.dispatch('role/getById', this.dataForm.id).then((resp) => {
            if (resp && resp.code === 200) {
              resp = resp.data
              this.dataForm.name = resp.name
              this.dataForm.description = resp.description
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('role/saveOrUpdate', {
            'id': this.dataForm.id || undefined,
            'method': this.dataForm.id ? 'put' : 'post',
            'name': this.dataForm.name,
            'description': this.dataForm.description
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
