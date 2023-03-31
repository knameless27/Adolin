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
        <Dialog header="Agregar" v-model:visible="addModal" :style="{ width: '350px' }" :modal="true" @hide="onHideAdd">
            <div class="flex align-items-center justify-content-center">
                <InputText v-model="nombre" type="text" class="w-full" placeholder="Nombre de la categoria..." />
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="onHideAdd" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="addCategoria" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Dialog header="Editar" v-model:visible="editModal" :style="{ width: '350px' }" :modal="true" @hide="onHideEdit">
            <div class="grid">
                <div class="col">
                    <InputText v-model="nombre" type="text" class="w-full" placeholder="Nombre de la categoria..." />
                </div>
            </div>
            <div class="grid">
                <div class="col">
                    <Dropdown v-model="estado" editable :options="estados" optionLabel="name" placeholder="Seleccione un estado" class="w-full" />
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
import axios from '@/service/categories.js';
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
            estado: null,
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
        goEdit(){
            this.editModal = true
            this.nombre = this.categoria.name
            this.estado = {name: this.categoria.state ? 'true' : 'false', code: this.categoria.state ? true : false}
        },
        addCategoria() {
            if (this.nombre == '') {
                this.$toast.add({ severity: 'info', summary: 'Advertencia', detail: 'El nombre no puede ir vacio', life: 3000 });
                return
            }
            const data = {
                name: this.nombre
            }
            axios.addCategory(data).then((res) => {
                this.$toast.add({ severity: 'success', summary: res.status, detail: res.message, life: 3000 });
                this.addModal = false
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
            this.estado = null
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
            const data = {
                name: this.nombre,
                state: this.estado.code
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
