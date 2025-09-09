<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const logout = useLogout()
const showConfirm = ref(false)

if (AuthService.hasAuth()) {
    router.push('/user/login')
}

function deletePopup() {
    showConfirm.value = false
}

function doDelete() {
    MainService.deleteUser(AuthService.getAuth().email)
    router.push('/user/login')
}

function cancelDelete() {
    showConfirm.value = false
}

function goToNewMessage() {
    router.push('/message/post')
}

function goToEditUser() {
    router.push('/user/edit')
}

</script>

<template>
    <Navigation />
    <div>
        <button class="btn btn-primary btn-block" @click="goToNewMessage()">Post something</button>

        <button id="delete" class="btn btn-primary btn-block" @click="deletePopup">Delete user?</button>

        <button class="btn btn-primary btn-block" @click="goToEditUser()">Change user details</button>

        <dvi v-if="showConfirm">
            <p>Are you sure you want to procede?</p>
            <button id="confirmDelete" type="button" class="btn btn-primary" @click="doDelete()">Confirm</button>
            <button id="cancelDelete" type='button' class="btn btn-primary" @click="cancelDelete()">Cancel</button>
        </dvi>
    </div>
</template>