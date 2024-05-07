<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { createAccount } from '@/lib/create'; // Assumes you have an API utility to handle account creation

const form = ref({
 handle: '',
 email: '',
 password: ''
});

const errorMessage = ref('');
const router = useRouter();

const submitForm = async () => {
 try {
   const response = await createAccount(form.value);
   if (response.success) {
     router.push('/sign'); // Adjust as necessary
   } else {
     errorMessage.value = 'Failed to create account. Please try again.';
   }
 } catch (error) {
   errorMessage.value = error.message || 'An error occurred.';
 }
};
</script>


<template>
 <div class="sign-container">
   <h1>Create Account...</h1>
   <form @submit.prevent="submitForm">
     <div class="form-group">
       <label for="handle">Handle:</label>
       <input id="handle" v-model="form.handle" type="text" required>
     </div>
     <div class="form-group">
       <label for="email">Email:</label>
       <input id="email" v-model="form.email" type="email" required>
     </div>
     <div class="form-group">
       <label for="password">Password:</label>
       <input id="password" v-model="form.password" type="password" required>
     </div>
     <p v-if="errorMessage">{{ errorMessage }}</p>
     <button type="submit">Enter</button>
   </form>
 </div>
</template>


<style scoped>
 .sign-container {
   max-width: 400px;
   margin: 30vh auto 10vh; /* Center vertically, move down 10vh from the top */
   padding: 20px;
   border-radius: 10px;
 }

  .form-group {
   margin-bottom: 20px;
   border: none;
 }

  h1 {
  /* 
   margin-left: 75px;  
   white-space: nowrap; 
  */
   color: #b8d8be;
   font-size: 3rem;
   font-weight: bold;
 }

  input {
   width: 100%;
   padding: 8px;
   margin-top: 5px;
   background-color: #fbf5eb;
   border: none;
 }

  button {
    background-color: #b8d8be;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    font-size: 1.2rem;
    margin-left: 100px;
    margin-right: auto;
 }
  button:hover {
   background-color: #a8c3ad;
 }
 
  p {
   color: #e85600;
 }
</style>
