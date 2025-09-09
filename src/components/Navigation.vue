<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';

const logout = useLogout()

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        Message Thingy
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <template v-if="AuthService.hasAuth()">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" @click="logout(null)">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
            <li class="nav-item">
            <RouterLink class="nav-link" to="/message/post">
              Post
            </RouterLink>
          </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/user/login">
                Login
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink class="nav-link" to="/user/register">
                Register
              </RouterLink>
            </li>
          </template>

          <!-- <li class="nav-item">
              <RouterLink class="nav-link" to="/message">
                Messages
              </RouterLink>
            </li> -->

          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">
              About
            </RouterLink>
          </li>
        </ul>
        <span class="navbar-text" v-if="AuthService.hasAuth()">
          <RouterLink class="nav-link" :to="`/user/me`">
            {{ AuthService.getUser() }}
          </RouterLink>

        </span>
      </div>
    </div>
  </nav>
</template>