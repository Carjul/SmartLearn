
<template>
    <div>

        <v-container class="body-component">
            <v-row>
                <v-col>
                    <v-avatar
            color="red"
            size="30"
            style="float:right"
          >
            <button @click="vuelveInicio()" class="white--text text-h5">X</button>
          </v-avatar>
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
                                    label="Autor"
                                    disabled
                                    ></v-text-field>
                                   
                            </v-col>

                            <v-col cols="4">
                                <v-select :items="items" v-model="noticeFile.category" menu-props="auto" label="Categoria"
                                    hide-details prepend-icon="mdi-tag" single-line></v-select>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-file-input v-model="noticeFile.images" label="Imagen de la noticia" variant="filled"
                                    accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"></v-file-input>
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
                                    <v-btn block class="my-2" color="green" type="submit" :disabled="!formIsValid">
                                        <v-icon dark>mdi-cloud-upload</v-icon>
                                        Enviar
                                    </v-btn>
                                </div>

                                <v-snackbar v-model="snackbar" :timeout="timeout" centered tile outlined color="success">
                                    {{ text }}
                                </v-snackbar>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-col>
            </v-row>


        </v-container>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import axios from 'axios';
import console from 'console';

export default {
    components: {
        VueEditor
    },

    data: () => ({
        prueba: true,
        snackbar: false,
        text: 'Noticia guardada correctamente... :D',
        timeout: 2000,
        loading: false,
        user:{},
        noticeFile: {
            title: "",
            autor: "",
            idAutor:"",
            category: "",
            time: null,
            abstract: "",
            content: "",
            images: "",
            estado: "redactado"
        },
        getNoticesFile: [],
        latestNoticeFromData: null,
        items: ['Educacion', 'Deporte', 'Administrativo', 'Politica'],
        rulesAbstract: [v => v.length <= 500 || 'Maximo 500 Palabras'],
        titleRules: [v => !!v || 'El Título es requerido'],
        authorRules: [v => !!v || 'El Autor es requerido'],
    }),

    mounted() {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        this.noticeFile.time = new Date().toLocaleString(undefined, options);
        this.user= this.$store.state.userData
        this.noticeFile.autor = this.user.name + " " + this.user.last_name
    },

    computed: {
        formIsValid() {
            // Verificar si todos los campos requeridos están completos
            return this.noticeFile.title && this.noticeFile.autor && this.noticeFile.category && this.noticeFile.time
                && this.noticeFile.abstract && this.noticeFile.content
                && this.noticeFile.images && this.prueba == true;
        },
    },


    methods: {
        vuelveInicio() {
            this.$router.push('/dashboard/welcome');
        },
        clearForm() {
            this.noticeFile.title = '';
            this.noticeFile.category = '';
            this.noticeFile.abstract = '';
            this.noticeFile.content = '';
            this.noticeFile.images = '';
        },

        extractTextFromContent() {
            const tempEl = document.createElement('div');
            tempEl.innerHTML = this.noticeFile.content;

            this.noticeFile.abstract = tempEl.textContent || tempEl.innerText;
        },

        
        //Tomar los datos de la noticia y enviarlo al Backend   
        //buscar estado y colocar idEstado a la noticia a guardar, por defecto en redactado
        async submitForm() {
            this.prueba = false
            const formData = new FormData();
            formData.append('file', this.noticeFile.images)
            await axios.post('http://localhost:3001/imagenNoticia', formData).then(async response => {
                console.log(response.data.status)
                if (response.data.status == 200) {
                    let paquete = {
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
                    await axios.post('http://localhost:3001/notice', paquete).then(response => {
                        this.snackbar = true;
                        if (response.status == "200") {
                            console.log(response.data)
                        }
                        this.clearForm()
                        this.prueba = true
                    })
                        .catch(error => {
                            // Aquí puedes manejar los errores de la petición
                            console.error(error);
                        });
                }
            })


        },
    }
}

</script>
<style scoped>
.image-small {
    width: 100px;
    height: 100px;
}

.image-medium {
    width: 200px;
    height: 200px;
}

.image-large {
    width: 300px;
    height: 300px;
}
</style>