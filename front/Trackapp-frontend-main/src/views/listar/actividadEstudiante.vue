<template>
    <v-container class="container">
    <!-- <pre>{{$data}}</pre>-->
       <v-row class="estilocompleto" >
        
        <v-bottom-navigation
    :value="value"
    color="teal"
    width="100%"
    max-height="60px"
    background-color="#f6f2f2"
    style="margin-left:-18px; margin-bottom: -2.6%; border-radius: 20px;"
    
  >
        <div style="margin-left:-200px; margin-top:1%; margin-right:10px;">
        <v-icon 
        color="blue"
        size="300%"
        left="true"
        >
        mdi-book-account</v-icon>
      </div>
        <h1>{{datos.task_asignature[0]}}</h1>
        
      <v-avatar
            color="red"
            size="30"
            style="float:right;margin-right:-200px;margin-left:80px;margin-top:10px; position:right;"
          >
            <button @click="vuelveInicio()" class="white--text text-h5">X</button>
          </v-avatar>
    
  </v-bottom-navigation>
            <v-row>
               <v-col col="8"
               sm="8">
              <v-card class="elevation-12 mt-12" color="transparent">
                <v-row style=" margin-left: 20px; padding-top: 40px;">
                  <h6 style="font-weight: bold;">{{datos.task_type}}</h6>
                </v-row>
                <v-row style=" margin-left: 20px; ">
                    <h5>{{datos.task_title}}</h5>
                  </v-row>
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">descripcion:</h6>
                  </v-row>
                  <v-row style=" margin: 20px;text-align: justify ">
                    <li>
                      {{datos.task_description}}
                   </li>
                  </v-row>
                  
                  
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">Entregable:</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; ">
                    <h6>{{datos.task_type}} diligenciado en formato PDF</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">recurso:</h6>
                  </v-row>
                  <v-row style=" margin-left: 40px;">
                    <a :href="datos.archivo[0].location" target="_blank" ><b-icon icon="file-earmark-pdf-fill" font-scale="5" style="color:#BC0B0B"></b-icon></a>  
                  </v-row>
                  <v-row style=" margin-left: 20px;padding:10px;margin-top:-1px">
                    <template>{{datos.archivo[0].originalname}}</template>
                  </v-row>
              </v-card>
            </v-col>
            <v-col col="4"
            sm="4">
              <v-card class="elevation-12 mt-12" color="transparent">
               
               <v-row style=" margin-left: 20px;  padding-top: 40px;">
                <h3>Estado de la entrega</h3>
                </v-row>
                <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">Estado:</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; ">
                    <h6>No entregado</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">Estado de califcación:</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; ">
                    <h6>Sin calificar</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">Ultima modificación:</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; ">
                    <h6>{{datos.deliveryDateInicial}}</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; margin-top:20px">
                    <h6 style="font-weight: bold;">Enviar archivo:</h6>
                  </v-row>
                  <v-row style=" margin-left: 20px; ">
                    <v-col
                    cols="12"
                    md="11"
                  >
                    <div
                      style="height:80px; width: 100%;padding: 5px; background-color:#D4D4D4;text-align:center; border-radius:20px; margin-top:-20px"
                    >
                    <div id="box-droppable" class="box-iner" @drop="drop" @dragover="allowDrop"> 
                       <h5> Adjuntar</h5>
                       <v-file-input style="position: absolute;top: 50%;left: 50%; margin: -25px 0 0 -25px;"
                       hide-input
                       
                       prepend-icon="mdi-tray-arrow-up"
                       truncate-length="1"
                      ></v-file-input>   
                    </div>
                    
                    </div>
                  </v-col>
                  </v-row>
                  <v-row>
                    <vs-button class="save" >
                    Enviar
                  </vs-button>
                  
                </v-row>
              </v-card>
            </v-col>
            </v-row>
        </v-row>
  
        
  
        
   
    </v-container>
  </template>
  
  <script>  
  /* import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  
    library.add(
        faStar,
        faPlus,
    ); */
  
    
//  import axios from 'axios'
    export default {
        data: function(){
            return{
                datos:[],
            }
        },
        mounted() {
        this.datos= this.$store.state.tareaEstudiante
        this.fechaModificacion()
        },
        methods: {
          fechaModificacion(){
            const date =this.datos.deliveryDateInicial;
          const brusco =date[0]+date[1]+date[2]+date[3]+date[4]+date[5]+date[6]+date[7]+date[8]+date[9];
          this.datos.deliveryDateInicial=brusco;
          },
          vuelveInicio(){     
      this.$router.push('/dashboard/welcome');
    },
        },
    }
  </script>
  
  <style scoped>
  .v-application .rounded-bl-xl {
      border-bottom-left-radius: 300px !important;
  }
  .v-application .rounded-br-xl {
      border-bottom-right-radius: 300px !important;
  }
  .image-col{
    background-image: url("../../assets/imgCrear/actividad.svg");
    background-size: 80vh 50vw;
    background-repeat: no-repeat;
  }
  
  .container{
    display: flex;
    margin-bottom: 50px;
    
  }
  .estado-tarea{
    width: 240px;
    height: 100px;
  }
  
  .estado-tarea .estado-tarea__buttons{
    background-color: #f6f2f2;
    border-radius: 20px;
    border: 1px solid #C3C3C5;
    height: 130px;
  }
  
  .estado-tarea .estado-tarea__buttons:hover{
    border: 1px solid black;
  }
  
  
  .adjuntar{
    background-color: #f6f2f2;
    border-radius: 20px;
    border: 1px solid #C3C3C5;
    width: 300px;
    margin-left: 50px;
    margin-top: 50px;
    padding: 2%;
  }
  
  .adjuntar:hover{
    border: 1px solid black;
  }
  
  h4{
    color: black;
    font-weight: 300;
  }
  
  .save{
    margin-left: 90px;
    background-color: green;
    max-width: 100px;
    max-height: 50px;
  }
  
  .divNew{
    position: absolute;
    background-color: #b99f9f;
    width: 78%;
    background-position-x: center;
    border-radius: 10px;
   
  }
  
  h1{
    font-size: 36px;
    font-weight: 800;
    color: #0F5C8c;
    display: inline;
    margin-right: 50%;
    margin-top: auto;
  }
  .estilocompleto{
    margin-left: 30px;
    margin-right: 30px;
    margin-block: 10px;
    
  }
  .box-iner {
    
    border-style: dashed;
border-radius: 20px;
margin:0px auto;
  width:100%;
  height: 70px;
 
  
}
  </style>
  