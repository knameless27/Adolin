<template>
    <div class="card">
        <div class="grid">
            <div class="col">
                <h1>Mi Biblioteca</h1>
            </div>
        </div>
        <div class="col">
            <InputText v-model="searchBook" type="text" class="w-full" @input="searchBooks()"
                placeholder="Buscar libros..." />
        </div>
        <hr />
        <div class="books" :style="`columns: ${books.length} 450px;`">
            <div class="card" v-for="(book, index) in books" :key="index">
                <div>
                    <img :src="book.image" alt="" class="imagenes">
                    <h3>{{ book.name }} - {{ book.Category.name }}</h3>
                    <h5>pages: {{ book.pages }}</h5>
                    <h5>Publication date: {{ book.publication_date.split(' ')[0] }}</h5>
                    <Button label="Quitar reserva" class="p-3 text-lg" @click="quitarReserva(book)"></Button>
                    .
                    <Button label="Leer" class="p-3 text-lg" @click="read()"></Button>
                </div>
            </div>
        </div>
        <Dialog header="Reservar libro" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }"
            :modal="true">
            <p class="line-height-3 m-0">
                {{ mensaje }}
            </p>
            <template #footer>
                <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import axios from '@/service/books.js'

let clearTimeOut;
export default {
    data() {
        return {
            books: [],
            mensaje: '',
            searchBook: '',
            display: false
        }
    },
    mounted() {
        axios.getBooks().then(({ data }) => {
            this.books = data
        })
    },
    methods: {
        read(){
            let a = document.createElement('a')
            // a.setAttribute("href", 'https://www.proturbiomarspa.com/files/_pdf-prueba.pdf').onclick()
        },
        searchBooks() {
            const data = {
                name: this.searchBook
            }
            clearTimeout(clearTimeOut);
            clearTimeOut = setTimeout(() => {
                axios.searchReservations(data).then(({ data }) => {
                    this.books = data
                })
            }, 500)
        },
        quitarReserva(book) {
            axios.removeReservation(book.id).then(({message})=>{
                this.mensaje = message
                this.display = true
            }).catch(({response: {data: {message}}}) => {
                this.mensaje = message
                this.display = true
            })
        },
        close(){
            this.display = false
        }
    }
}
</script>

<style scoped>
.imagenes {
    max-width: 90%;
    border-radius: 15px;
    margin-bottom: 0.5em;
}</style>
