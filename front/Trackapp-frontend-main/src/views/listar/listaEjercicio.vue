<template>
    <div >
      <div  class="box-style box-style-l">
        <div id="personal" class="">
          <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
          <div class="row justify-content-md-center">
            <div class="col-md-12">
              <div class="main-card mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize text-center font-weight-normal">
                      <i class="header-icon lnr-charts icon-gradient bg-happy-green"></i>
                        Tabla Con El Listado
                    </div>
                  </div>

                  <div class="px-5 py-5">
                    <v-row>
                    <v-col col="8" xs="4">                           
                  
                  <div>
                  <table class="table table-striped" >
                    <thead>
                      <tr>
                        <th scope="col">Asignature</th>
                        <th scope="col">Grado</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha inicial</th>
                        <th scope="col">Fecha final</th>
                        <th scope="col">Estado de la tarea</th>
                        <th scope="col">Archivo</th>
                        <th scope="col">Opciones</th>
                      </tr>
                    </thead>

                    <tbody>
                          
                      <tr v-for="(exercise, index) in exercises" :key="exercise._id" >
                        
                        <td>{{exercise.task_asignature}}</td>
                        <td>{{exercise.topic}}</td>
                        <td>{{exercise.task_type}}</td>
                        <td>{{exercise.task_title}}</td>
                        <td>{{exercise.task_description}}</td>                      
                        <td>{{exercise.deliveryDateInicial}}</td>
                        <td>{{exercise.deliveryDateFinal}}</td>
                        <td>{{exercise.task_status}}</td>
                        <td>{{exercise.archive}}</td>
                        <td>
                            <b-button @click="editar(index)" style="background-color:#05AFF2" >
                              <b-icon icon="pencil-square" aria-hidden="true">
                              </b-icon>
                            </b-button> <span>   </span>
                            <b-button @click="eliminar(exercise._id)" style="background-color: #E2583E">
                              <b-icon icon="trash2" aria-hidden="true">
                              </b-icon>
                            </b-button>
                        </td>

                      </tr>
                    </tbody>
                  </table>

                <div class="center">
                <vs-dialog  prevent-close  width="300px" not-center v-model="active3" >
      
                <template #header >
                  <h4 class="not-margin">
                    Editar datos del <b>ejercicio</b>
                  </h4>
                </template>
    
    
                <div class="con-content">
                  <input v-model="title" type="name" style="background-color:#EDE2E2;"  
                         class="form-control input_pass"> <br>
                  <textarea v-model="description" type="name" style="background-color:#EDE2E2;"  
                         class="form-control input_pass"></textarea> <br>
                  <input v-model="date" type="Date" style="background-color:#EDE2E2;"  
                         class="form-control input_pass">
                </div>
    
                <template #footer>
                  <div class="con-footer">
                    <vs-button @click="guardarEdicion()">
                      Guardar Cambios
                    </vs-button>
                    <vs-button @click="active3=false" >
                      Cancelar
                    </vs-button>
                  </div>
                </template>
              </vs-dialog>
            </div>
          </div>
  </v-col>
  </v-row>

  <v-dialog v-model="dialogo" persistent max-width="500">
        
        <v-card :style="colo">
          <v-card-title class="text-h5 justify-center">
            {{mensaje}}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black darken-1" text @click="limpiar()"
            style="background-color:#05AFF2;"           >
            OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
                            
          </div>
        </div>
      </div>
     </div>
   </div>        
</div>      
</div>

</template>

<script>
import axios from 'axios'
import PageTitle from "../../Layout/Components/PageTitle.vue";
  export default {
      components: {
              PageTitle
          },
    
      data() {
        return {
          exercises: [],
          mensaje:"",
          dialogo: false,
          title: '',
          description: '',
          date: "",
          subtopic_id: null,
          active3: false,
          items: null,
          heading: 'Tareas asignadas',
          icon: 'pe-7s-note2 icon-gradient bg-tempting-azure',
          subheading: 'Listado de las tareas',
          posEditar:0,
          id_edit: ""
        }
      },
  
      mounted(){
        let vue = this;
        axios.get('http://localhost:3001/exercises').then(
            function(response){
                vue.exercises = response.data;
                console.log(vue.exercises)
            }
        )
    },

      methods: {
        editar(index){
          this.active3=true
          this.title=this.exercises[index].title
          this.description=this.exercises[index].description
          this.date=this.exercises[index].date
          this.id_edit=this.exercises[index]._id
          console.log(this.date)
        },
      
      guardarEdicion(){
        console.log(this.date);
        let exercise= {
            "exercises":{
                "title": `${this.title}`,
                "description": `${this.description}`,
                "date": `${this.date}`
            }
        }
        axios.put(`http://localhost:3001/exercises/${this.id_edit}`, exercise)
        .then((response) => {
          console.log(response);
          this.active3 = false
          this.colo="background-color:#8188CE"
          this.dialogo=true
          this.mensaje="La tarea ha sido actualizada"
          let vue = this;
          axios.get('http://localhost:3001/exercises').then(
            function(response){
                vue.exercises = response.data;
                console.log(vue.exercises)
            }
        )
        })
        
      },

      eliminar(i){
        axios.delete(`http://localhost:3001/exercises/${i}`)
        .then((response) => {
            if(response.data.status == 200){
                this.exercises.splice(i,1);
            }
            this.active3 = false
            this.colo="background-color: #E2583E"
            this.dialogo=true
            this.mensaje="La tarea ha sido eliminada"
            let vue = this;
            axios.get('http://localhost:3001/exercises').then(
            function(response){
                vue.exercises = response.data;
                console.log(vue.exercises)
            }
          )
        })
      },
      limpiar(){
        this.dialogo = false;
      }
    }
  }
    </script>
    
    <style scoped>
     .container{
      height: auto;
      max-width: auto;
     }
  
  
     
  .con-footer{
   display: flex;
   align-items: center;
   justify-content: flex-end}
   .vs-button{
     margin: 0px}
     .vs-button__content{
       padding: 10px 30px}
     .vs-button{
       margin-left: 10px}
  .not-margin{
   margin :0px;
   font-weight :normal;
   padding :10px;
   padding-bottom: 0px}
  .con-content{
   width: 100%}
   p{
     font-size: .8rem;
     padding: 0px 10px}
   .vs-checkbox-label{
     font-size :.8rem}
   .vs-input-parent{
     width: 100%}
   .vs-input-content{
     margin: 10px 0px;
     width: calc(100%)}
     .vs-input{
       width: 100%}
  .footer-dialog{
   display: flex;
   align-items :center;
   justify-content :center;
   flex-direction :column;
   width :calc(100%)}
   .new{
     margin: 0px;
     margin-top :20px;
     padding: 0px;
     font-size: .7rem}
   .vs-button{
     margin :0px}
    </style>
    