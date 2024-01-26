<template>
  <page-container title="经济发展">
    <!-- <el-button @click="to"> 跳转</el-button> -->
    <div ref="echartRef" class="echart"></div>
  </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { initECharts } from '@/utils/echarts';
const echartRef = ref();
const myEchart = ref();
const options = ref({
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
});
onMounted(() => {
  myEchart.value = initECharts(echartRef.value, options.value);
  window.addEventListener('resize', () => {
    console.log(11);
    myEchart.value.resize(
     { width: 'auto', height: 'auto'}
    ); // 窗口发生改变就更新echarts
  });
});

const to = () => {
  router.push('/government-data/echart');
};
</script>

<style lang="scss" scoped>

.echart {
  width: 500px;
  height: 500px;
}
</style>
