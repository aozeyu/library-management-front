<template>
  <div
    class="mod-config"
    id="myChart"
  ></div>
</template>

<script>
import { hotCategory } from "@/api/chart/index";
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
        hotCategory().then((resp) => {
          if (resp && resp.code === 200) {
            const data = resp.data
            // 绘制图表
            myChart.setOption({
              legend: {
                left: 'left',
                textStyle: {
                  fontSize: 25
                }
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              series: [
                {
                  name: 'Nightingale Chart',
                  type: 'pie',
                  radius: [50, 250],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                    borderRadius: 8
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
                  data: data
                }
              ]
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
  width: 1200px;
  height: 1200px;
}
</style>