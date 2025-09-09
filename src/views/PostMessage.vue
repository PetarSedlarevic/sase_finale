<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { isNavigationFailure, useRouter } from 'vue-router';


const router = useRouter()

if (!AuthService.hasAuth()) {
    router.push('/user/login')
}

const title = ref<string>('')
const content = ref<string>('')
const email = AuthService.getEmail()
const logout = useLogout()

function post(e: Event) {
    e.preventDefault()

    if (title.value == '' || content.value == '') return

    MainService.createNewMessage(title.value, content.value, email)
        .then(rsp => {
            router.push('/')
        })
        .then((failure) => {
            if (isNavigationFailure(failure)) {
                console.warn('Navigation Failed: ', failure)
            }
        })
        .catch(e => alert('Something went wrong there'))
}

</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Post a message</h2>
        </div>
        <form @submit.prevent="e => post(e)">
           <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="title" class="form-control" id="title" v-model="title">
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Share your thoughts</label>
                <input type="content" class="form-control" id="content" v-model="content">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button> 
        </form>
    </div>
</template>