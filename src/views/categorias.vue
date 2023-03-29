<template>
    <div class="card">
        <h1>categorias</h1>
        <TreeTable :value="categorias">
            <Column field="name" header="name" expander></Column>
            <Column field="state" header="state"></Column>
            <Column field="actions" header="actions ">
                <template #body>
                    <div class="flex flex-wrap gap-2">
                        <Button type="button" icon="pi pi-search" rounded />
                        <Button type="button" icon="pi pi-pencil" rounded severity="success" />
                    </div>
                </template>
            </Column>
        </TreeTable>
    </div>
</template>

<script>
import axios from '@/service/categories.js'
export default {
    data() {
        return {
            categorias: null,
            categ: '',
            filtros: {}
        }
    },
    methods: {
        searchCategories() {

        }
    },
    created() {
        axios.getCategories().then(({ data }) => {
            console.log(data);
            this.categorias = data.map((category)=> {
                category.data = category
                return category
            })
        })
    },
}
</script>
