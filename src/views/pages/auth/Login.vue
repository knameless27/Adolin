<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from '@/service/auth.js'

const toast = useToast();
const router = useRouter()
const { layoutConfig, contextPath } = useLayout();
const email = ref('');
const password = ref('');

const logoUrl = computed(() => {
    return `${contextPath}layout/images/sword.png`;
});

const subm = () => {
    const data = {
        email: email.value,
        password: password.value
    }
    axios.login(data).then((res) => {
        localStorage.setItem('user', JSON.stringify(res))
        router.push('/')
    }).catch((e) => {
        toast.add({ severity: 'error', summary: 'Error al registrarse', detail: e.response.data?.message, life: 3000 });
    })
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <Toast />
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Iniciar sesion</div>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <Button @click="subm" label="Logearse" class="w-full p-3 text-xl"></Button>
                        <hr />
                        <a class="font-medium no-underline ml-2 text-center cursor-pointer"
                            style="color: var(--primary-color)" @click="router.push('register')">
                            <p>
                                ¿No tienes cuenta? ¡Registrate gratis aqui!
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
