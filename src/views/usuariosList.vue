<template>
    <div class="card">
        <div class="grid">
            <div class="col-8">
                <h1>usuarios</h1>
            </div>
            <div class="col-3">
                <InputText v-model="categ" type="text" class="w-full" @input="searchCategories()"
                    placeholder="Buscar usuarios por email..." />
            </div>
            <div class="col-1">
                <Button type="button" icon="pi pi-plus" rounded severity="success" @click="addItem()" />
            </div>
        </div>
        <DataTable :value="categorias">
            <Column field="email" header="email" expander>
                <template #body="item">
                    <span>{{ item.data.email }}</span>
                </template>
            </Column>
            <Column field="name" header="name">
                <template #body="item">
                    <span>{{ item.data.name }}</span>
                </template>
            </Column>
            <Column field="rol" header="rol">
                <template #body="item">
                    <span>{{ item.data.Role.name }}</span>
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
        <dialogsCateg :open="open" :categoria="categoria" @backdrop="closeDialog($event)" />
        <Toast />
    </div>
</template>

<script>
import axios from '@/service/users.js';
import Toast from 'primevue/toast';
import dialogsCateg from '../components/usersDialogs/usuarios.vue';


export default {
    components: {
        Toast,
        dialogsCateg,
    },
    data() {
        return {
            categorias: null,
            categ: '',
            filtros: {},
            deleteModal: false,
            addModal: false,
            displayConfirmation: false,
            nombre: '',
            categoria: null,
            open: 0
        }
    },
    methods: {
        addItem(){
            this.open = 1
        },
        editItem(cat){
            this.open = 2
            this.categoria = cat
        },
        deleteItem(cat) {
            this.open = 3
            this.categoria = cat
        },
        closeDialog() {
            this.open = 0
            this.searchCategories()
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
