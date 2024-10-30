<template>
  <div class="card">
    <div class="card-header">
      <h2>Select a AudioBook to Edit</h2>
    </div>
    <div class="card-content">
      <div class="form-group">
        <label for="book-select">Choose a Book:</label>
        <select id="book-select" v-model="selectedBook" class="form-control">
          <option disabled value="">Select a book</option>
          <option v-for="book in books" :key="book.id" :value="book.id">
            {{ book.title }} - {{ book.author }} - {{ formatDate(book.start_date) }}
          </option>
        </select>
      </div>
      <!-- Container to hold the buttons side by side -->
      <div class="button-group">
        <button @click="goToEdit" class="btn-primary" :disabled="!selectedBook">
          Edit Book
        </button>
        <button @click="goToDelete" class="btn-primary" :disabled="!selectedBook">
          Delete Book
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from '#app';

const books = ref([]);
const selectedBook = ref('');
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('/api/audiobooks');
    books.value = await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});

const goToEdit = () => {
  if (selectedBook.value) {
    router.push(`/edit/${selectedBook.value}`);
  }
};

const goToDelete = async () => {
  if (selectedBook.value) {
    try {
      if (confirm("Are you sure you want to delete this audiobook?")) {
        const response = await fetch(`/api/audiobooks/${selectedBook.value}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          books.value = books.value.filter(book => book.id !== selectedBook.value);
          alert('Audiobook deleted successfully!');
        } else {
          console.error('Error deleting audiobook:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error deleting audiobook:', error);
    }
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

</script>

<style scoped>
.form-group {
  margin-bottom: 1em;
}

.button-group {
  display: flex;
  gap: 1em; /* Adds space between buttons */
}
</style>