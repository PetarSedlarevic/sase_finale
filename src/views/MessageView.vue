<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { MessageModel } from '@/models/message.model';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { MessageService } from '@/services/message.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditMessage from './EditMessage.vue';

const router = useRouter()
const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)
const message = ref<MessageModel>()

if (!AuthService.hasAuth()) {
    router.push('/user/login')
}

function checkId(message: any, user: number){
    console.log(user)
    console.log(message)
    return message == user 
}

function editMessage() {
    router.push(`/message/${id}/edit`)
}

function deleteMessage() {
    MainService.deleteMessage(id)
    router.push('/')
}

MessageService.getMessageById(id)
    .then(rsp => message.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <div v-if="message">
        <div class="row mb-3">
            <div class="col-6">
                <div class="card-header">
                    <h3>{{ message.title }}</h3>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        {{ message.content }}
                    </li>
                    <li class="list-group-item">
                        Added on: {{ formatTime(message.createdAt) }}
                    </li>
                    <li class="list-group-item" v-if="checkId(message.userId, AuthService.getUserId())">
                        <button class="btn btn-primary" @click="editMessage">
                            Edit Message
                        </button>
                    </li>
                    <li class="list-group-item" v-else>
                        <button class="btn btn-primary disabled">
                            You can't edit this message
                        </button>
                    </li>
                    <li class="list-group-item" v-if="checkId(message.userId, AuthService.getUserId())">
                        <button class="btn btn-primary" @click="deleteMessage">
                            Delete Message
                        </button>
                    </li>
                    <li class="list-group-item" v-else>
                        <button class="btn btn-primary disabled">
                            You can't delete this message
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>