<template>
    <div>
        <v-container class="body-component">
            <v-row>
                <v-col>
                    <v-avatar color="red" size="30" style="float:right">
                        <button @click="vuelveInicio()" class="white--text text-h5">X</button>
                    </v-avatar>

                </v-col>
            </v-row>
            <!------listar noticiess-->

            <div v-if="user.isRedactor">
                <div class="container">
                    <h1>Mis noticias</h1>
                    <div class="row">

                        <div class="col-md-4" v-for="(item) in noticies" :key="item._id">
                            <div v-if="Estado(item.estado[0]) === 'redactado' || Estado(item.estado[0]) === 'rechazado'"
                                class="card">
                                <div class="card-header">
                                    <h3>{{ item.title }}</h3>
                                </div>
                                <div class="card-body">
                                    <img :src="item.imagen" alt="" class="img-fluid">
                                    <p v-html="item.content"></p>
                                    <p>{{ Estado(item.estado[0]) }}</p>
                                    <p v-if="item.observacion" class="text-danger">Observacion: {{ item.observacion }}</p>
                                </div>
                                <div v-if="user.isRedactor && Estado(item.estado[0]) === 'rechazado'" class="card-footer">
                                    <button class="btn btn-warning">Editar</button>
                                 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div v-if="user.isEditor">
                <div class="container">
                    <h1>Editar noticias</h1>
                    <div class="row">

                        <div class="col-md-4" v-for="(item) in noticies2" :key="item._id">
                            <div v-if="Estado(item.estado[0]) === 'redactado'" class="card">
                                <div class="card-header">
                                    <h3>{{ item.title }}</h3>
                                </div>
                                <div class="card-body">
                                    <img :src="item.imagen" alt="" class="img-fluid">
                                    <p v-html="item.content"></p>
                                    <p>{{ Estado(item.estado[0]) }}</p>
                                </div>
                                <div v-if="user.isEditor" class="card-footer">
                                    <button class="btn btn-danger">Rechazar</button>
                                    <button class="btn btn-warning" @click="pasarapublic(item._id)">Publicar</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </v-container>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data: () => ({
        user: [],
        noticieState: [],
        noticies: [],
        noticies2: [],
        estados: []
    }
    ),
    methods: {

        //mostrar estado en html
        pasarapublic(id) {
            console.log(id)
            if (id) {
                axios.put(`http://localhost:3001/noticeUpdateEst`, { _id: id }).then((response) => {
                    console.log(response.data)
                    this.getNotices2(this.user)
                })
            }

        },
        Estado(id) {

            for (let i = 0; i < this.estados.length; i++) {
                if (this.estados[i]._id == id) {
                    return this.estados[i].description
                }
            }
            console.log(this.estados)

        },

        vuelveInicio() {
            this.$router.push('/dashboard/welcome');
        },
        getState() {
            try {

                axios.post(`http://localhost:3001/estadoNoticia/`).then((response) => {
                    this.estados = response.data;
                    console.log(this.estados)

                })

            } catch (error) {
                console.error(error);
            }
        },
        getNotices(user) {
            try {
                axios.get("http://localhost:3001/notices").then((response) => {
                    var x = response.data?.filter(e => e.idAutor[0] === user._id)
                    this.noticies = x.reverse()
                })

            } catch (error) {
                console.error(error);
            }
        },
        getNotices2(user) {
            try {
                axios.get("http://localhost:3001/notices").then((response) => {
                    var y = response.data?.filter(e => e.idAutor[0] !== user?._id)
                    this.noticies2 = y.reverse()

                })


            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.user = this.$store.state.userData
        this.getNotices(this.user);
        this.getNotices2(this.user)
        this.getState()

    }
}
</script>
<style></style>