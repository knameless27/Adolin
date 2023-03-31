<template>
    <div>
        <Dialog header="Advertencia" v-model:visible="deleteModal" :style="{ width: '350px' }" :modal="true" @hide="onHideDelete">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>¿Seguro que desea eliminar esta categoria?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="onHideDelete" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="deleteItem" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Dialog header="Agregar" v-model:visible="addModal" :style="{ width: '480px' }" :modal="true" @hide="onHideAdd">
            <div class="grid">
                <div class="row">
                    <div class="col">
                        <InputText v-model="nombre" type="text" class="w-full" placeholder="Nombre del usuario..." />
                    </div>
                    <div class="col">
                        <InputText v-model="email" type="email" class="w-full" placeholder="Email del usuario..." />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <InputText v-model="password" type="text" class="w-full" placeholder="Contraseña del usuario..." />
                    </div>
                    <div class="col">
                        <Dropdown v-model="rol" @input="searchRoles" editable :options="roles" optionLabel="name" placeholder="Rol del usuario..." class="w-full" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="onHideAdd" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="addCategoria" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Dialog header="Editar" v-model:visible="editModal" :style="{ width: '950px' }" :modal="true" @hide="onHideEdit">
            <div class="grid">
                <div class="col">
                    <InputText v-model="nombre" type="text" class="w-full" placeholder="Nombre de la categoria..." />
                </div>
                <div class="col">
                    <InputText v-model="email" type="email" class="w-full" placeholder="Email del usuario..." />
                </div>
                <div class="col">
                    <InputText v-model="password" type="text" class="w-full" placeholder="Contraseña del usuario..." />
                </div>
            </div>
            <div class="grid">
                <div class="col">
                    <Dropdown v-model="estado" editable :options="estados" optionLabel="name" placeholder="Seleccione un estado" class="w-full" />
                </div>
                <div class="col">
                    <Dropdown v-model="rol" @input="searchRoles" editable :options="roles" optionLabel="name" placeholder="Rol del usuario..." class="w-full" />
                </div>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="onHideEdit" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="editCategory" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Toast />
    </div>
</template>

<script>
import axios from '@/service/users.js';
import axiosR from '@/service/roles.js';
import Toast from 'primevue/toast'

export default {
    components: {
        Toast,
    },
    data() {
        return {
            categorias: null,
            categ: '',
            filtros: {},
            deleteModal: false,
            editModal: false,
            addModal: false,
            displayConfirmation: false,
            nombre: '',
            email: '',
            password: '',
            estado: null,
            rol: null,
            roles: [],
            estados: [
                {
                    name: 'true',
                    code: true,
                },
                {
                    name: 'false',
                    code: false,
                },
            ]
        }
    },
    props: {
        open: {
            type: Number,
            default: 0,
            required: false
        },
        categoria: {
            type: Object,
            default: null,
            required: false
        }
    },
    watch: {
        open() {
            switch (this.open) {
                case 1:
                    this.addModal = true
                    break;
                case 2:
                    this.goEdit()
                    break;
                case 3:
                    this.deleteModal = true
                    break;
            }
        }
    },
    methods: {
        searchRoles(){
            const data = {
                name: this.rol
            }
            axiosR.searchCategories(data).then(({ data }) => {
                this.roles = data
            })
        },
        goEdit(){
            this.editModal = true
            this.rol = {name: this.categoria.Role.name, code: this.categoria.Role.id}
            this.roles = [this.rol]
            this.email = this.categoria.email
            this.password = this.categoria.password
            this.nombre = this.categoria.name
            this.estado = {name: this.categoria.state ? 'true' : 'false', code: this.categoria.state ? true : false}
        },
        addCategoria() {
            let regEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
            if (this.nombre == '' || this.email == '' || this.password == '' || !this.rol.id && !regEmail.test(this.email)) {
                this.$toast.add({ severity: 'info', summary: 'Advertencia', detail: 'Verifique los datos', life: 3000 });
                return
            }
            const data = {
                name: this.nombre,
                email: this.email,
                password: this.password,
                RoleId: this.rol.id
            }
            axios.addCategory(data).then((res) => {
                this.$toast.add({ severity: 'success', summary: res.status, detail: res.message, life: 3000 });
                this.onHideAdd()
            }).catch(({ response: { data } }) => {
                this.$toast.add({ severity: 'info', summary: data.status, detail: data.message, life: 3000 });
            })
        },
        onHideAdd() {
            this.resetItems()
            this.addModal = false
            this.$emit('backdrop')
        },
        onHideDelete() {
            this.resetItems()
            this.deleteModal = false
            this.$emit('backdrop')
        },
        onHideEdit() {
            this.resetItems()
            this.editModal = false
            this.$emit('backdrop')
        },
        resetItems() {
            this.nombre = ''
            this.password = ''
            this.email = ''
            this.estado = null
            this.rol = null
        },
        deleteItem() {
            axios.deleteCategory(this.categoria.id).then((res) => {
                this.$toast.add({ severity: 'success', summary: res.status, detail: res.message, life: 3000 });
                this.resetItems()
                this.deleteModal = false
            }).catch(({ response: { data } }) => {
                this.$toast.add({ severity: 'info', summary: data.status, detail: data.message, life: 3000 });
            })
        },
        editCategory() {
            let regEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
            if (this.nombre == '' || this.email == '' || this.password == '' && !regEmail.test(this.email)) {
                this.$toast.add({ severity: 'info', summary: 'Advertencia', detail: 'Verifique los datos', life: 3000 });
                return
            }
            const data = {
                name: this.nombre,
                state: this.estado.code,
                email: this.email,
                password: this.password,
                RoleId: this.rol.code ? this.rol.code : this.rol.id
            }
            axios.editCategory(this.categoria.id, data).then((res)=> {
                this.$toast.add({ severity: 'success', summary: res.status, detail: res.message, life: 3000 });
                this.resetItems()
                this.editModal = false
            }).catch(({ response: { data } }) => {
                this.$toast.add({ severity: 'info', summary: data.status, detail: data.message, life: 3000 });
            })
        },
        closeConfirmation() {
            this.displayConfirmation = false
        },

    }
}
</script>
