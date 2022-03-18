<template>
  <div
    class="mod-config"
    id="myChart"
  ></div>
</template>

<script>
import { hotBook } from "@/api/chart/index";
export default {
  data () {
    return {
    }
  },
  components: {

  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      new Promise(() => {
        hotBook().then((resp) => {
          if (resp && resp.code === 200) {
            const data = resp.data

            var arr = []; //定义数组
            arr.push([])
            for (var i in data) {
              var arrr = []
              for (var ii in data[i]) {
                arrr.push(data[i][ii])
              }
              arr.push(arrr)
            }

            // 绘制图表
            myChart.setOption({
              dataset: [
                {
                  dimensions: ['bookId', 'count', 'bookName'],
                  source: arr
                },
                {
                  transform: {
                    type: 'sort',
                    config: { dimension: 'count', order: 'desc' }
                  }
                }
              ],
              xAxis: {
                type: 'category',
                axisLabel: { interval: 0, rotate: 30, fontSize: 20 }
              },
              yAxis: {
                minInterval: 1
              },
              series: {
                type: 'bar',
                encode: { x: 'bookName', y: 'count' },
                datasetIndex: 1,
                itemStyle: {
                  normal: {
                    // 定制显示（按顺序）
                    color: function (params) {
                      var colorList = ['#EE6666', '#5470c6', '#91cc75', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#EE6666', '#5470c6', '#91cc75', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];
                      return colorList[params.dataIndex]
                    }
                  },
                },
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 25
                    }
                  },
                  emphasis: {
                    show: true
                  }
                },
              },
              grid: {
                left: '10%',
                bottom: '35%'
              },
            })
          }
        })
      })




    }
  }
}
</script>
<style scoped>
.mod-config {
  margin: 0 auto;
  width: 1000px;
  height: 1200px;
}
</style>