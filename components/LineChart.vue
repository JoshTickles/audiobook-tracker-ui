<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { Chart } from 'chart.js';
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true,
    },
  });
  
  const chartCanvas = ref(null);
  let chartInstance = null;
  
  const createChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    if (chartCanvas.value) {
      chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: props.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };
  
  watch(() => props.chartData, createChart, { immediate: true });
  
  onMounted(() => {
    createChart();
  });
  </script>
  
  <style scoped>
  /* Styles specific to the LineChart component */
  </style>