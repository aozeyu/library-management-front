<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="上级分类id" prop="parentId">
      <el-input v-model="dataForm.parentId" placeholder="上级分类id"></el-input>
    </el-form-item>
    <el-form-item label="分类名称" prop="categoryName">
      <el-input v-model="dataForm.categoryName" placeholder="分类名称"></el-input>
    </el-form-item>
    <el-form-item label="分类编码" prop="categoryCode">
      <el-input v-model="dataForm.categoryCode" placeholder="分类编码"></el-input>
    </el-form-item>
    <el-form-item label="同一层级分类排序排序" prop="seq">
      <el-input v-model="dataForm.seq" placeholder="同一层级分类排序排序"></el-input>
    </el-form-item>
    <el-form-item label="0-未删 1-已删" prop="deleted">
      <el-input v-model="dataForm.deleted" placeholder="0-未删 1-已删"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="createBy">
      <el-input v-model="dataForm.createBy" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新人" prop="updateBy">
      <el-input v-model="dataForm.updateBy" placeholder="更新人"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
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
          parentId: '',
          categoryName: '',
          categoryCode: '',
          seq: '',
          deleted: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '上级分类id不能为空', trigger: 'blur' }
          ],
          categoryName: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
          categoryCode: [
            { required: true, message: '分类编码不能为空', trigger: 'blur' }
          ],
          seq: [
            { required: true, message: '同一层级分类排序排序不能为空', trigger: 'blur' }
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
            { required: true, message: '更新人不能为空', trigger: 'blur' }
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
            this.$store.dispatch('bookcategory/getById', this.dataForm.id).then((resp) => {
              if (resp && resp.code === 200) {
                resp = resp.data
                this.dataForm.parentId = resp.parentId
                this.dataForm.categoryName = resp.categoryName
                this.dataForm.categoryCode = resp.categoryCode
                this.dataForm.seq = resp.seq
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
              this.$store.dispatch('bookcategory/saveOrUpdate', {
                'id': this.dataForm.id || undefined,
                'method': this.dataForm.id ? 'put' : 'post',
                'parentId': this.dataForm.parentId,
                'categoryName': this.dataForm.categoryName,
                'categoryCode': this.dataForm.categoryCode,
                'seq': this.dataForm.seq,
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
