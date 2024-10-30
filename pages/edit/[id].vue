<template>
  <div class="card">
    <div class="card-header">
      <h2>Edit Book</h2>
    </div>
    <div class="card-content">
      <form @submit.prevent="updateBook">
        <div class="form-group">
          <label for="title">Title:</label>
          <input id="title" v-model="book.title" class="form-control" placeholder="Title" required />
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input id="author" v-model="book.author" class="form-control" placeholder="Author" required />
        </div>
        <div class="form-group">
          <label for="length">Length (HH:MM:SS):</label>
          <input
            id="length"
            v-model="book.length"
            type="text"
            class="form-control"
            placeholder="Length"
            pattern="^\d+:[0-5]\d:[0-5]\d$"
            required
          />
        </div>
        <div class="form-group">
          <label for="start-date">Start Date:</label>
          <input id="start-date" v-model="book.start_date" type="date" class="form-control" placeholder="Start Date" />
        </div>
        <div class="form-group">
          <label for="end-date">End Date:</label>
          <input id="end-date" v-model="book.end_date" type="date" class="form-control" placeholder="End Date" />
        </div>
        <br>
        <button type="submit" class="btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from '#app';

const book = ref({});
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    const response = await fetch(`/api/audiobooks/${route.params.id}`);
    if (!response.ok) throw new Error('Failed to fetch book data');
    book.value = await response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
  }
});

async function updateBook() {
  try {
    const response = await fetch(`/api/audiobooks/${book.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book.value)
    });

    if (response.ok) {
      router.push('/');
    } else {
      console.error('Error updating book:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating book:', error);
  }
}
</script>

<style scoped>
/* Remove scoped styles as they are now handled globally */
</style>