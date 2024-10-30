<template>
  <div class="card">
    <div class="card-header">
      <h2>Add a New AudioBook</h2>
    </div>
    <div class="card-content">
      <form @submit.prevent="addBook">
        <div class="form-group">
          <label for="title">Title:</label>
          <input id="title" v-model="newBook.title" class="form-control" placeholder="Title" required />
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input id="author" v-model="newBook.author" class="form-control" placeholder="Author" required />
        </div>
        <div class="form-group">
          <label for="length">Length (HH:MM:SS):</label>
          <input
            id="length"
            v-model="newBook.length"
            type="text"
            class="form-control"
            placeholder="Length"
            pattern="^\d+:[0-5]\d:[0-5]\d$"
            required
          />
        </div>
        <div class="form-group">
          <label for="start-date">Start Date:</label>
          <input id="start-date" v-model="newBook.start_date" type="date" class="form-control" required />
        </div>
        <button type="submit" class="btn-primary">Add Book</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from '#app';

const newBook = ref({
  title: '',
  author: '',
  length: '',
  start_date: ''
});

const router = useRouter();

const addBook = async () => {
  try {
    const response = await fetch('/api/audiobooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook.value)
    });

    if (response.ok) {
      alert('Book added successfully!');
      router.push('/'); // Navigate to home or list page
    } else {
      console.error('Error adding book:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding book:', error);
  }
};
</script>

<style scoped>
/* Use global styles if available */
</style>