<template>
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <div class="toggle-btn" @click="toggleSidebar">
        ☰
      </div>
      <ul>
        <li>
          <a href="/">
            <font-awesome-icon icon="house" />
            <span v-if="!isCollapsed">Home</span>
          </a>
        </li>
        <li>
          <a href="/add">
            <font-awesome-icon icon="plus" />
            <span v-if="!isCollapsed">Add AudioBook</span>
          </a>
        </li>

        <li>
          <a href="/edit">
            <font-awesome-icon icon="edit" />
            <span v-if="!isCollapsed">Edit AudioBook</span>
          </a>
        </li>

        <li>
          <a href="/stats">
            <font-awesome-icon icon="chart-line" />
            <span v-if="!isCollapsed">Stats</span>
          </a>
        </li>

      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faHouse, faEdit, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  library.add(faHouse, faEdit, faPlus, faChartLine);
  
  const isCollapsed = ref(true);
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  </script>
  
<style scoped>

ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
}
li {
    padding: 10px 0;
    width: 100%;
}
a {
    text-decoration: none;
    color: #ddd; /* Light color for text */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    transition: background-color 0.3s, color 0.3s;
}
a span {
    margin-left: 10px;
}
a:hover {
    background-color: #404040; /* Slightly lighter background on hover */
    color: #fff; /* Ensure text is readable on hover */
}
</style>