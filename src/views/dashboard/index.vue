<template>
  <div class="mod-config">
    <el-row
      :gutter="40"
      class="panel-group"
    >
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon
              icon-class="peoples"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              读者
            </div>
            <div class="card-panel-num">
              {{userNum}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon
              icon-class="skill"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              分类
            </div>
            <div class="card-panel-num">
              {{categoryNum}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon
              icon-class="book"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              图书
            </div>
            <div class="card-panel-num">
              {{bookNum}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon
              icon-class="book-borrow"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              借阅
            </div>
            <div class="card-panel-num">
              {{borrowNum}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getNum from '@/api/dashboard/index'

export default {
  name: 'Dashboard',
  data () {
    return {
      userNum: 1,
      bookNum: 2,
      borrowNum: 3,
      categoryNum: 4
    }
  },
  computed: {
    ...mapGetters([
      'nickName',
      "permissions"
    ])
  },
  mounted () {
    this.getDashboardData()
  },
  methods: {
    getDashboardData () {
      new Promise(() => {
        getNum().then(resp => {
          let data = resp.data
          this.userNum = data.userNum
          this.bookNum = data.bookNum
          this.borrowNum = data.borrowNum
          this.categoryNum = data.categoryNum
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
<style lang="scss" scoped>
.mod-config {
  margin: 20px;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
