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
        label="分类名称"
        prop="categoryName"
      >
        <el-input
          v-model="dataForm.categoryName"
          placeholder="分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="分类编码"
        prop="categoryCode"
      >
        <el-input
          v-model="dataForm.categoryCode"
          placeholder="分类编码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="排序"
        prop="seq"
      >
        <el-input
          v-model="dataForm.seq"
          placeholder="排序"
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
import { getById, saveOrUpdate } from '@/api/library/category'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        parentId: '',
        categoryName: '',
        categoryCode: '',
        seq: ''
      },
      dataRule: {
        categoryName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        categoryCode: [
          { required: true, message: '分类编码不能为空', trigger: 'blur' }
        ],
        seq: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id, action) {
      if (action === 'add') {
        // 新增
        this.dataForm.parentId = id
        id = 0
      }
      this.dataForm.id = id || 0

      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id && action === 'update') {
          // 更新
          new Promise(() => {
            getById(this.dataForm.id).then(resp => {
              if (resp && resp.code === 200) {
                resp = resp.data
                this.dataForm.categoryName = resp.categoryName
                this.dataForm.categoryCode = resp.categoryCode
                this.dataForm.seq = resp.seq
                this.dataForm.parentId = resp.parentId
              }
            })
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate({
            'id': this.dataForm.id || undefined,
            'parentId': this.dataForm.parentId,
            'method': this.dataForm.id ? 'put' : 'post',
            'categoryName': this.dataForm.categoryName,
            'categoryCode': this.dataForm.categoryCode,
            'seq': this.dataForm.seq
          }).then(resp => {
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
