<template>
  <div class="card">
    <div class="card-header">
      <h1>AudioBook Overview</h1>
    </div>
    <div class="card-content">
      <table class="styled-table">
        <thead>
          <tr>
            <th @click="sortTable('title')">Title</th>
            <th @click="sortTable('author')">Author</th>
            <th @click="sortTable('length')">Length</th>
            <th @click="sortTable('start_date')">Start Date</th>
            <th @click="sortTable('end_date')">End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in sortedBooks" :key="book.id">
            <td class="clickable" @click="navigateToEdit(book.id)">{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.length }}</td>
            <td>{{ formatDate(book.start_date) }}</td>
            <td>{{ formatDate(book.end_date) || 'N/A' }}</td>
            <td>
              <font-awesome-icon icon="edit" class="action-icon" @click="navigateToEdit(book.id)" />
              <font-awesome-icon icon="trash" class="action-icon" @click="deleteBook(book.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from '#app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEdit, faTrash);

const books = ref([]);
const sortKey = ref('');
const sortOrder = ref(1);
const router = useRouter();

const sortedBooks = computed(() => {
  return [...books.value].sort((a, b) => {
    if (sortKey.value) {
      const aValue = a[sortKey.value] || '';
      const bValue = b[sortKey.value] || '';
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder.value * aValue.localeCompare(bValue);
      }
      return sortOrder.value * (aValue > bValue ? 1 : -1);
    }
    return 0;
  });
});

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const navigateToEdit = (id) => {
  router.push(`/edit/${id}`);
};

const deleteBook = async (id) => {
  try {
    if (confirm("Are you sure you want to delete this audiobook?")) {
      const response = await fetch(`/api/audiobooks/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        books.value = books.value.filter(book => book.id !== id);
        alert('Audiobook deleted successfully!');
      } else {
        console.error('Error deleting audiobook:', response.statusText);
      }
    }
  } catch (error) {
    console.error('Error deleting audiobook:', error);
  }
};

onMounted(async () => {
  try {
    const response = await fetch('/api/audiobooks');
    books.value = await response.json();
  } catch (error) {
    console.error('Error fetching audiobooks:', error);
  }
});
</script>