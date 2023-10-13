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
                                    <button class="btn btn-warning" @click="mostrarModal2(item)">Editar</button>

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
                                    <button class="btn btn-danger" @click="mostrarModal(item._id)">Rechazar</button>
                                    <button class="btn btn-warning" @click="pasarapublic(item._id)">Publicar</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div v-if="modalVisible" id="modal">
                <div id="modal-contenido">
                    <!-- Contenido del modal -->
                    <h2>Rechazar Noticia</h2>
                    <textarea name="" id="" cols="30" rows="10" v-model="observacion" required
                        placeholder="type observacion" style="border: solid 2px;">
                    </textarea>
                    <!-- Botón para cerrar el modal -->
                    <div>
                        <button v-if="observacion !== ''" @click="rechazarN" class="btn btn-warning">Enviar</button>
                        <button @click="cerrarModal" class="btn btn-danger">Cerrar Modal</button>
                    </div>
                </div>
            </div>
            <div v-if="modal2Visible" id="modal">
                <div id="modal-contenido2">
                    <!-- Contenido del modal -->

                    <v-form ref="form" @submit.prevent="submitForm">

                        <h1>TITULO</h1>

                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="noticeFile.title" label="Nombre del Articulo"
                                    :rules="titleRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <h3>Autor</h3>
                        <v-row>
                            <v-col cols="4" md="4">
                                <v-text-field v-model="noticeFile.autor" prepend-icon="mdi-account" :rules="authorRules"
                                    label="Autor" disabled></v-text-field>

                            </v-col>

                            <v-col cols="4">
                                <v-select :items="items" v-model="noticeFile.category" menu-props="auto" label="Categoria"
                                    hide-details prepend-icon="mdi-tag" single-line></v-select>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-file-input v-model="noticeFile.images2" @change="estadoImagen"
                                    label="Imagen de la noticia" variant="filled" accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea label="Resumen" v-model="noticeFile.abstract" :rules="rulesAbstract" auto-grow
                                    outlined rows="1" row-height="15">
                                </v-textarea>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <vue-editor id="editor" v-model="noticeFile.content" useCustomImageHandler
                                    @blur="extractTextFromContent">
                                    <!--@image-added="handleImageAdded"-->
                                </vue-editor>
                                <div>
                                    <v-btn block class="my-2" color="green" type="submit">
                                        <v-icon dark>mdi-cloud-upload</v-icon>
                                        Enviar
                                    </v-btn>
                                </div>


                            </v-col>
                        </v-row>

                    </v-form>
                    <div>
                        <button @click="cerrarModal2" class="btn btn-danger">Cerrar Modal</button>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>


<script>
import axios from 'axios';
import { VueEditor } from 'vue2-editor';
export default {
    components: {
        VueEditor
    },
    data: () => ({
        uploadImage: false,
        noticeFile: {
            _id: "",
            title: "",
            autor: "",
            idAutor: "",
            category: "",
            time: null,
            abstract: "",
            content: "",
            images: "",
            images2: "",
            estado: "redactado"
        },
        observacion: '',
        id_notice: "",
        user: [],
        items: ['Educacion', 'Deporte', 'Administrativo', 'Politica'],
        noticieState: [],
        noticies: [],
        noticies2: [],
        modalVisible: false,
        modal2Visible: false,
        estados: []
    }
    ),
    methods: {
        estadoImagen() {
            this.uploadImage = true;
        },
        extractTextFromContent() {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = this.noticeFile.content;

            this.noticeFile.abstract = tempEl.textContent || tempEl.innerText;
        },
        rechazarN() {
            axios.put(`http://localhost:3001/noticeUpdateEst2`, { _id: this.id_notice, observacion: this.observacion }).then((response) => {
                console.log(response.data)
                this.getNotices2(this.user)
                this.cerrarModal()
            })
            this.observacion = ''
            this.id_notice = ''
        },
        mostrarModal(x) {
            this.modalVisible = true;
            this.id_notice = x;
        },
        mostrarModal2(x) {
            this.modal2Visible = true;
            this.noticeFile._id = x._id;
            this.noticeFile.title = x.title;
            this.noticeFile.autor = x.autor;
            this.noticeFile.category = x.category;
            this.noticeFile.abstract = x.abstract;
            this.noticeFile.images = x.images;
            this.noticeFile.content = x.content;
            this.noticeFile.time = x.time;
            this.noticeFile.estado = x.estado;
            this.id_notice = x._id;
        },
        //no programado
        async submitForm() {
            this.prueba = false
            if (this.uploadImage) {
                const formData = new FormData();
                formData.append('file', this.noticeFile.images2)

                await axios.post('http://localhost:3001/imagenNoticia', formData).then(async response => {
                    console.log(response.data.status)
                    if (response.data.status == 200) {
                        let paquete = {
                            _id: this.noticeFile._id,
                            title: this.noticeFile.title,
                            autor: this.noticeFile.autor,
                            idAutor: this.user?._id,
                            category: this.noticeFile.category,
                            time: this.noticeFile.time,
                            abstract: this.noticeFile.abstract,
                            content: this.noticeFile.content,
                            images: response.data.nU,
                            estado: this.noticeFile.estado
                        }
                        await axios.put('http://localhost:3001/noticeUpdate2', paquete).then(response => {
                            this.snackbar = true;
                            if (response.status == "200") {
                                console.log(response.data)
                                this.cerrarModal2()
                            }
                            this.clearForm()
                            this.getNotices2(this.user)
                            this.getNotices(this.user)
                        })
                            .catch(error => {
                                // Aquí puedes manejar los errores de la petición
                                console.error(error);
                            });
                    }
                })
                this.uploadImage = false;
            }
            else {
                let paquete = {
                    _id: this.noticeFile._id,
                    title: this.noticeFile.title,
                    autor: this.noticeFile.autor,
                    idAutor: this.user?._id,
                    category: this.noticeFile.category,
                    time: this.noticeFile.time,
                    abstract: this.noticeFile.abstract,
                    content: this.noticeFile.content,
                    images: this.noticeFile.images,
                    estado: this.noticeFile.estado
                }
                await axios.put('http://localhost:3001/noticeUpdate2', paquete).then(response => {
                    this.snackbar = true;
                    if (response.status == "200") {
                        console.log(response.data)
                        this.cerrarModal2()
                    }
                    this.getNotices2(this.user)
                    this.getNotices(this.user)
                })
                    .catch(error => {
                        // Aquí puedes manejar los errores de la petición
                        console.error(error);
                    });
                console.log(paquete)
            }



        },
        cerrarModal() {
            this.modalVisible = false;

        },
        cerrarModal2() {
            this.modal2Visible = false;

        },
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
<style>
#modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

/* Estilos para el contenido del modal */
#modal-contenido {
    background-color: white;
    padding: 20px;
    width: 50%;
    height: 50%;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#modal-contenido2 {
    background-color: white;
    padding: 20px;
    width: 70%;
    height: 90%;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>