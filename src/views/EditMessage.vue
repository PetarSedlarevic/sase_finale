<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { MessageModel } from '@/models/message.model';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { MessageService } from '@/services/message.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter()
const route = useRoute()
const logout = useLogout()
const message = ref<MessageModel>()
const id = Number(route.params.id)

if (!AuthService.hasAuth()) {
    router.push('/user/login')
}

MessageService.getMessageById(id)
    .then(rsp => message.value = rsp.data)
    .catch(e => alert("message not found"))

const title = ref<string>('')
const content = ref<string>('')

function edit(e: Event) {
    e.preventDefault()

    if (title.value == '' || content.value == '') return

    MainService.editMessage(title.value, content.value, id)
    router.push('/')
}

</script>

<template>
    <Navigation />
    <div class="card-body">
        <div class="text-center">
            <h2>Edit the message</h2>

        </div>
        <form @submit.prevent="e => edit(e)">
            <div class="mb-3">
                <label for="title" class="form-label">Message Title</label>
                <input type="title" class="form-control" id="title" placeholder="" v-model="title">
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Write your message</label>
                <input type="content" class="form-control" id="content" v-model="content">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>