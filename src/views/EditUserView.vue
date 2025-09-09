<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref<string>('')
const name = ref<string>('')
const router = useRouter()
const logout = useLogout()

if (!AuthService.hasAuth()) {
    router.push('/user/login')
}

const id = AuthService.getUserId()

function doEdit(e: Event) {
    e.preventDefault()

    if (name.value == '' || password.value == '') return

    MainService.editUser(name.value, password.value, id)

    logout(null)
    router.push('/user/login')
}

</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Change password and username</h2>
        </div>
        <form v-on:submit="e => doEdit(e)">
            <div class="mb-3">
                <label for="name" class="form-label">New username</label>
                <input type="name" class="form-control" id="name" v-model="name">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">New password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>