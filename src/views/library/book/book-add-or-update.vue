<template>
  <el-dialog
    :title="!dataForm.id ? '上架' : '修改'"
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
        label="分类"
        prop="bookCategoryId"
      >
        <el-select
          filterable
          v-model="dataForm.bookCategoryId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in bookCategorys"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="书名"
        prop="bookName"
      >
        <el-input
          v-model="dataForm.bookName"
          placeholder="书名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="作者"
        prop="author"
      >
        <el-input
          v-model="dataForm.author"
          placeholder="作者"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="出版年份"
        prop="publicationYear"
      >
        <el-date-picker
          v-model="dataForm.publicationYear"
          type="year"
          value-format="yyyy"
          placeholder="选择出版年份"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="isbn"
        prop="isbn"
      >
        <el-input
          v-model="dataForm.isbn"
          placeholder="isbn"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="price"
      >
        <el-input
          v-model="dataForm.price"
          placeholder="价格"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="页数"
        prop="pages"
      >
        <el-input
          v-model="dataForm.pages"
          placeholder="页数"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="image"
      >
        <el-input
          v-model="dataForm.image"
          placeholder="图片"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="库存"
        prop="stock"
      >
        <el-input
          v-model="dataForm.stock"
          placeholder="图片"
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
import { getById, saveOrUpdate } from '@/api/library/book'
import { list } from '@/api/library/category'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        bookCategoryId: '',
        bookName: '',
        author: '',
        publicationYear: '',
        isbn: '',
        price: '',
        pages: '',
        image: '',
        stock: ''
      },
      bookCategorys: [],
      dataRule: {
        bookCategoryId: [
          { required: true, message: '分类id不能为空', trigger: 'blur' }
        ],
        bookName: [
          { required: true, message: '书名不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        publicationYear: [
          { required: true, message: '出版年份不能为空', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: 'isbn不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ],
        pages: [
          { required: true, message: '页数不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '库存不能为空', trigger: 'blur' }
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
          new Promise(() => {
            getById(this.dataForm.id).then(resp => {
              if (resp && resp.code === 200) {
                resp = resp.data
                this.dataForm.bookCategoryId = resp.bookCategoryId
                this.dataForm.bookName = resp.bookName
                this.dataForm.author = resp.author
                this.dataForm.publicationYear = resp.publicationYear
                this.dataForm.isbn = resp.isbn
                this.dataForm.price = resp.price
                this.dataForm.pages = resp.pages
                this.dataForm.image = resp.image
                this.dataForm.stock = resp.stock
              }
            })
          })
        }
      })
    },

    getCategorys () {
      this.$nextTick(() => {
        new Promise(() => {
          list({ current: 1, size: 500, key: '' }).then((resp) => {
            if (resp && resp.code === 200) {
              this.bookCategorys = resp.data.records
            }
          })
        })
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          new Promise(() => {
            saveOrUpdate({
              'id': this.dataForm.id || undefined,
              'method': this.dataForm.id ? 'put' : 'post',
              'bookCategoryId': this.dataForm.bookCategoryId,
              'bookName': this.dataForm.bookName,
              'author': this.dataForm.author,
              'publicationYear': this.dataForm.publicationYear,
              'isbn': this.dataForm.isbn,
              'price': this.dataForm.price,
              'pages': this.dataForm.pages,
              'image': this.dataForm.image,
              'stock': this.dataForm.stock
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
          })
        }
      })
    }
  }
}
</script>
