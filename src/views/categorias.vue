<template>
    <div class="card">
        <div class="grid">
            <div class="col-8">
                <h1>categorias</h1>
            </div>
            <div class="col-3">
                <InputText v-model="categ" type="text" class="w-full" @input="searchCategories()"
                    placeholder="Buscar Categorias..." />
            </div>
            <div class="col-1">
                <Button type="button" icon="pi pi-plus" rounded severity="success" @click="addItem()" />
            </div>
        </div>
        <DataTable :value="categorias">
            <Column field="name" header="name" expander>
                <template #body="item">
                    <span>{{ item.data.name }}</span>
                </template>
            </Column>
            <Column header="state">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.state" :severity="slotProps.data.state ? 'success' : 'secondary'" />
                </template>
            </Column>
            <Column header="actions">
                <template #body="slotProps">
                    <div class="flex flex-wrap gap-2">
                        <Button type="button" icon="pi pi-pencil" rounded severity="warning"
                            @click="editItem(slotProps.data)" />
                        <Button type="button" icon="pi pi-trash" rounded severity="danger"
                            @click="deleteItem(slotProps.data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Dialog header="Advertencia" v-model:visible="deleteModal" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>¿Seguro que desea eliminar esta categoria?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="deleteCateg" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Dialog header="Agregar" v-model:visible="addModal" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <InputText v-model="nombre" type="text" class="w-full" placeholder="Nombre de la categoria..." />
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeAdd" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="addCategoria" class="p-button-text" autofocus />
            </template>
        </Dialog>
        <Dialog header="Editar" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>¿Seguro que desea eliminar esta categoria?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
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
            addModal: false,
            displayConfirmation: false,
            nombre: ''
        }
    },
    methods: {
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
                this.searchCategories()
                this.addModal = false
            }).catch(({ response: { data } }) => {
                this.$toast.add({ severity: 'info', summary: data.status, detail: data.message, life: 3000 });
            })
        },
        closeAdd() {
            this.nombre = ''
            this.addModal = false
        },
        addItem() {
            this.addModal = true
        },
        deleteItem(item) {
            this.deleteModal = true
            axios.deleteItem(item.id).then((res) => {
                this.$toast.add({ severity: 'success', summary: res.status, detail: res.message, life: 3000 });
                this.searchCategories()
                this.deleteModal = false
            }).catch(({ response: { data } }) => {
                this.$toast.add({ severity: 'info', summary: data.status, detail: data.message, life: 3000 });
            })
        },
        editItem(item) {
            console.log(item);
        },
        closeConfirmation() {
            this.displayConfirmation = false
        },
        searchCategories() {
            const data = {
                name: this.categ
            }
            axios.searchCategories(data).then(({ data }) => {
                this.categorias = data.map((category) => {
                    category.data = category
                    return category
                })
            })
        }
    },
    created() {
        axios.getCategories().then(({ data }) => {
            this.categorias = data.map((category) => {
                category.data = category
                return category
            })
        })
    },
}
</script>
