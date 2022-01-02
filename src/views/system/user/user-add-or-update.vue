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
        label="登录账号"
        prop="username"
      >
        <el-input
          v-model="dataForm.username"
          placeholder="登录账号"
          :disabled="dataForm.id ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="nickName"
      >
        <el-input
          v-model="dataForm.nickName"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="头像"
        prop="avatar"
      >
        <el-input
          v-model="dataForm.avatar"
          placeholder="头像"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="性别"
        prop="gender"
      >
        <el-select
          v-model="dataForm.gender"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
      >
        <el-input
          v-model="dataForm.phone"
          placeholder="手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="dataForm.email"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="帐号状态"
        prop="enabled"
      >
        <el-switch
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
          v-model="dataForm.enabled"
        >
        </el-switch>
      </el-form-item>
      <el-form-item
        label="角色"
        prop="roles"
      >
        <el-select
          v-model="dataForm.roles"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
import role from '@/store/modules/system/role'
export default {
  data () {
    return {
      options: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }],
      visible: false,
      dataForm: {
        id: 0,
        username: '',
        nickName: '',
        avatar: '',
        gender: 1,
        phone: '',
        email: '',
        admin: 0,
        enabled: 1,
        roles: []
      },
      dataRule: {
        username: [
          { required: true, message: '登录账号不能为空', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '昵称/姓名不能为空', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '性别 0-女 1-男不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '帐号状态不能为空', trigger: 'blur' }
        ]
      },
      roles: []
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$store.dispatch('user/getById', this.dataForm.id).then((resp) => {
            if (resp && resp.code === 200) {
              resp = resp.data
              this.dataForm.username = resp.username
              this.dataForm.nickName = resp.nickName
              this.dataForm.avatar = resp.avatar
              this.dataForm.gender = resp.gender
              this.dataForm.phone = resp.phone
              this.dataForm.email = resp.email
              this.dataForm.password = resp.password
              this.dataForm.admin = resp.admin
              this.dataForm.enabled = resp.enabled
              this.dataForm.roles = resp.roles
            }
          })
        }
      })
    },

    getRoles () {
      this.$nextTick(() => {
        this.$store.dispatch('role/list', { current: 1, size: 100 }).then((resp) => {
          if (resp && resp.code === 200) {
            this.roles = resp.data.records
          }
        })
      })
    },

    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/saveOrUpdate', {
            'id': this.dataForm.id || undefined,
            'username': this.dataForm.username,
            'nickName': this.dataForm.nickName,
            'avatar': this.dataForm.avatar,
            'gender': this.dataForm.gender,
            'phone': this.dataForm.phone,
            'email': this.dataForm.email,
            'enabled': this.dataForm.enabled,
            'roles': this.dataForm.roles,
            'method': this.dataForm.id ? 'put' : 'post'
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
