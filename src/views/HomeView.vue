<script setup lang="ts">
import { ref } from 'vue';
import Navigation from '../components/Navigation.vue';
import type { MessageModel } from '@/models/message.model';
import { MessageService } from '@/services/message.service';
import { useLogout } from '@/hooks/logout.hook';
import router from '@/router';

const logout = useLogout()
const message = ref<MessageModel[]>()
const allMessages = ref<MessageModel[]>()

MessageService.getMessage()
    .then(rsp => {
        allMessages.value = rsp.data
        message.value = rsp.data
    })
    .catch(e => logout(e))

function doSearch(e: any) {

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
                    <!-- <p>Added by {{ userAndIDMap.get(s.addedBy!) ?? "unknown" }} </p> -->
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
