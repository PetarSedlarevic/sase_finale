<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Navigation from '../components/Navigation.vue';
import type { MessageModel } from '@/models/message.model';
import { MessageService } from '@/services/message.service';
import { useLogout } from '@/hooks/logout.hook';
import router from '@/router';
import { MainService } from '@/services/main.service';
import { AuthService } from '@/services/auth.service';

const logout = useLogout()
const message = ref<MessageModel[]>()
const allMessages = ref<MessageModel[]>()
const userAndIDMap = new Map<number, string>()

if (!AuthService.hasAuth()) {
    router.push('/user/login')
}

MessageService.getMessage()
    .then(rsp => {
        allMessages.value = rsp.data
        message.value = rsp.data
    })
    .catch(e => logout(e))

onMounted(async () => {
    
    try {
        const [useRsp] = await Promise.all([
            MainService.getUsers()
        ])
        console.log(useRsp.data)
        for (const u of useRsp.data ?? []) {
            userAndIDMap.set(u.userId, u.userName)
        }
    } catch (e) {
        console.log('Trying to mount')
    }
})

function doSearch(e: any) {
    console.log(userAndIDMap)
    if (allMessages.value == undefined) {
        console.log('Sup fuckers, im evil pomni')
        return
    }

    const input = e.target.value ? e.target.value.toLowerCase() : ''

    if (input == '') {
        message.value = allMessages.value
    }

    message.value = allMessages.value.filter(m => {
        return m.content.toLowerCase().includes(input) ||
            m.title.toLowerCase().includes(input)
    })
}

function goToMessage(id: number) {
    router.push(`/message/${id}`)
}
</script>

<template>
    <Navigation />
    <div class="input-group mb-3 search">
        <span class="input-group-text" id="search"></span>
        <input type="text" class="form-controll" aria-describedby="search" placeholder="Find a message"
            @keyup="(e) => doSearch(e)"></input>
    </div>

    <div class="wrapper mb-3" v-if="message">
        <div class="card spot-card" v-for="m in message" :key="m.messageId">
            <div class="card-body">
                <h4 class="card-title">{{ m.title }}</h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">{{ m.content }}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <p>Added by {{ userAndIDMap.get(m.userId) ?? "unknown" }} </p>
                </li>
                <li class="list-group-item">
                    <RouterLink :to="`/message/${m.messageId}`" class="btn btn-sm btn-primary">
                        M-M-M-M-M-M-M-M-EVANGELION
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>

</template>
