<template>
    <div class="card">
        <h1>Mi perfil</h1>
        <hr />
        <div class="box">
            <div class="Card">
                <h1>{{ user.name }} - {{ user.Role?.name }}</h1>
                <h4>{{ user.email }}</h4>
                <h4>Estas con nosotros desde: {{ new Date(user.createdAt).toLocaleString().split(', ')[0] }}</h4>
            </div>
            <div>
                <h1>Las categorias que mas te gusta leer:</h1>
                <Chart type="pie" :data="chartData" :options="chartOptions" style="width: 25em" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/service/users.js';

export default {
    data() {
        return {
            chartData: null,
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            },
            user: {}
        }
    },
    mounted() {
        axios.myProfile().then((res) => {
            let labels = [];
            res.data.Books.map((book) => {
                let lab = labels.find((label) => label == book.Category.name)
                if (!lab) {
                    labels.push(book.Category.name)
                }
            })
            let numData = labels.map(label => res.data.Books.filter((book) => book.Category.name == label).length)
            this.chartData = this.setChartData(labels, numData);
            this.user = res.data
        })

    },
    methods: {
        setChartData(labels, data) {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--green-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400'),
                            documentStyle.getPropertyValue('--yellow-400'),
                            documentStyle.getPropertyValue('--green-400')
                        ]
                    }
                ]
            };
        }
    }
}
</script>

<style>
.box {
    display: grid;
    grid-template-rows: repeat(2);
    grid-template-columns: repeat(2, 50%);
}

.Card {
    padding-left: 10%;
}
</style>
