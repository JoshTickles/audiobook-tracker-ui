// import axios from 'axios';

// export default defineNuxtPlugin(nuxtApp => {
//   const apiClient = axios.create({
//     baseURL: process.env.API_BASE_URL, 
//     headers: {
//       'access_token': process.env.API_KEY
//     }
//   });

//   // Debug 
//   apiClient.interceptors.request.use(request => {
//     console.log('Starting Request', request);
//     return request;
//   });

//   apiClient.interceptors.response.use(response => {
//     console.log('Response:', response);
//     return response;
//   });

//   nuxtApp.provide('axios', apiClient);
// });

