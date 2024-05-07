<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { createSession } from "@/lib/bsky";

const router = useRouter();
const state = reactive({
  identifier: "",
  password: "",
  hasError: false,
});

const login = async () => {
  const { success } = await createSession(state);

  state.hasError = !success;

  if (success) {
    router.replace({ name: "index" });
  }
};
</script>

<template>
  <div class="login-container">
        <h1 class="login-title">Sign in</h1>

  <form :class="{ 'has-error': state.hasError }" @submit.prevent="login">
    <div class="form-group">
      <input type="text" id="identifier" v-model="state.identifier" class="form-control" @input="state.hasError = false" placeholder="Email or user handle" required autofocus>
    
      <!--
      <input
        id="identifier"
        v-model="state.identifier" 
        class="form-input"
        type="text"
        @input="state.hasError = false"
      />
    -->
    </div>

    <div class="form-group">
      <input type="password" id="password" v-model="state.password" class="form-control" @input="state.hasError = false" placeholder="Password" required>
      
      <!--
      <input
        id="password"
        v-model="state.password"
        class="form-input"
        type="password"
        @input="state.hasError = false"
      />
      -->
    </div>

    <p v-if="state.hasError" class="form-input-hint">
      Invalid email or password.
    </p>

    <!-- <button type="submit" class="btn btn-primary">Enter</button> -->
    <button type="submit" class="submit-btn">Enter</button>
  </form>
</div>
</template>
