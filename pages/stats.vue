<template>
  <div class="card">
    <div class="card-header">
      <h1>Listening Stats</h1>
    </div>
    <div class="card-content">
      <div class="metric-container">
        <div class="metric-title">
          <h2>Total Listening Time</h2>
        </div>
        <div class="metric-line">
          <p class="metric">{{ totalListeningTime.days }} Days</p>
          <span class="spacer"></span>
          <p class="metric">{{ totalListeningTime.hours }} Hours</p>
          <span class="spacer"></span>
          <p class="metric">{{ totalListeningTime.minutes }} Minutes</p>
        </div>
      </div>
      <div class="metric-container">
        <h2>Total Books Completed</h2>
        <p class="metric">{{ booksCompleted }}</p>
      </div>
      <div class="metric-container">
        <h2>Books In Progress</h2>
        <p class="metric">{{ booksInProgress }}</p>
      </div>
      <div class="chart-container">
        <h2>Books Listened Per Month</h2>
        <BarChart v-if="booksPerMonthData" :chart-data="booksPerMonthData" />
      </div>
      <div class="chart-container">
        <h2>Top Authors</h2>
        <PieChart v-if="topAuthorsData" :chart-data="topAuthorsData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement);

const books = ref([]);

const totalListeningTime = ref({ days: 0, hours: 0, minutes: 0 });
const booksCompleted = ref(0);
const booksInProgress = ref(0);
const booksPerMonthData = ref(null);
const topAuthorsData = ref(null);

const BarChart = Bar;
const PieChart = Pie;

onMounted(async () => {
  await fetchBooks();
  calculateStats();
});

const fetchBooks = async () => {
  try {
    const response = await fetch('/api/audiobooks');
    books.value = await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

const calculateStats = () => {
  // Initialize counters
  booksCompleted.value = 0;
  booksInProgress.value = 0;

  // Calculate total listening time for books with an end_date
  let totalHours = 0;
  let totalMinutes = 0;

  books.value.forEach(book => {
    if (book.end_date) {
      const [hours, minutes, seconds] = book.length.split(':').map(Number);
      totalHours += hours;
      totalMinutes += minutes + Math.floor(seconds / 60);
      booksCompleted.value += 1;
    }
    if (book.start_date && !book.end_date) {
      booksInProgress.value += 1;
    }
  });

  // Convert excess minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Convert hours to days
  const totalDays = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  totalListeningTime.value = {
    days: totalDays,
    hours: remainingHours,
    minutes: remainingMinutes
  };

  // Calculate books listened to per month
  const booksPerMonthDataMap = {};
  books.value.forEach(book => {
    if (book.end_date) {
      const month = new Date(book.end_date).toLocaleString('default', { month: 'long' });
      booksPerMonthDataMap[month] = (booksPerMonthDataMap[month] || 0) + 1;
    }
  });

  booksPerMonthData.value = {
    labels: Object.keys(booksPerMonthDataMap),
    datasets: [
      {
        label: 'Books Listened',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: Object.values(booksPerMonthDataMap),
      },
    ],
  };

  // Calculate top authors
  const authorCounts = {};
  books.value.forEach(book => {
    authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
  });

  topAuthorsData.value = {
    labels: Object.keys(authorCounts),
    datasets: [
      {
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data: Object.values(authorCounts),
      },
    ],
  };
};
</script>

<style scoped>

.card-content {
  padding: 20px;
}

.metric-container {
  margin: 20px 0;
  text-align: center;
}

.metric-title {
  margin-bottom: 10px;
}

.metric-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.metric {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4b5563;
  margin: 0 10px;
}

.spacer {
  width: 20px;
}
.chart-container {
  margin: 20px 0;
}

.chart-container h2 {
  text-align: center;
  margin-bottom: 10px;
  color: #4b5563;
}
</style>