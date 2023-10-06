<template>
   <div>
    <v-avatar
            color="red"
            size="30"
            style="float:right"
          >
            <button @click="vuelveInicio()" class="white--text text-h5">X</button>
          </v-avatar>
   <!-- <pre>{{$data}}</pre>-->
   
    <div class="div" v-if="infoUsuario.rol=='Docente'">
    <div class="fondosub" v-for="(dato,index) in infoUsuario.asignatures" :key="index">
                <v-menu
                
      bottom
      origin="center center"
      transition="scale-transition"
    
    >
      <template v-slot:activator="{ on, attrs }">
        <label
          v-bind="attrs"
          v-on="on"
        >
       
            {{dato.name}}
     
      </label>
      </template>

      <v-list class="fondosubP" >
        <v-list-item @click="crearActividad(index)">
        <v-icon>mdi-notebook-edit</v-icon>
       <v-list-item-title style="margin-left:20px">Crear Actividad</v-list-item-title>
        </v-list-item>

        <v-list-item @click="listarActividad()">
          <v-icon>mdi-clipboard-list-outline</v-icon>
            <v-list-item-title style="margin-left:20px">Listar Actividades</v-list-item-title>
          </v-list-item>
      </v-list>
    </v-menu>       
</div>
    </div>

    <div class="div" v-if="infoUsuario.rol=='Estudiante'">
        <div @click="Cambia(index)" class="fondosub" v-for="(i, index) in pruebamil" :key="i">
                    {{i.name}}
            </div>


            <vs-dialog blur v-model="active" class="dialogo">
                    <div class="  text-capitalize " style="font-weight: bold;font-size:30px;color:rgb(6, 90, 187);">
                      
                        <div style="float:left"><b-icon icon="bell-fill" font-scale="1.5" style="color:rgb(6, 90, 187);"></b-icon>  Actividades</div>
                          
                   <div  style="margin-left:500px;color:rgb(31, 29, 29);font-size:25px;margin-right:30px;font-weight: normal;">
                      Pendientes: {{ejercicioMostar.length}}
                   </div>

                      </div>
                      <hr style=" height: 3px;"  width="100%" color="black">
                <div style="max-height:350px; overflow: scroll;" class="yerlis">
                <div v-for="(dato, index) in ejercicioMostar" :key="index">
                 <div style="background-color:#D4D4D4;height:90px;padding:4px;border-radius:10px;margin:10px">
                   <!--- <v-avatar
                    
                    size="20"
                    style="float:right;background-color:red;color:white;font-weight: bold;"
                  >
                    <button  class="white--text text-h6">X</button>
                  </v-avatar>-->
                    <div class="pruebaColor" :style="{'background-color':mycolor}"></div>
                  <div style="float:left">
                    <h6>{{dato.task_asignature[0]}}</h6>
                    <h5 style="font-weight: bold;">{{dato.task_title}}</h5>
                    <h6>Disponible desde: {{dato.deliveryDateInicial}}</h6>
                </div>
                <div style="height:80px;float:right; width: 70px; display: flex;justify-content: center;align-items: center;">
                   <button> <b-icon @click="cambiarEnvioTarea(index)" style="color:green;" icon="telegram" font-scale="3"></b-icon></button>
                </div>
                    <div style="float:right">
                        <h6 align="right">Vence</h6>
                    <h5 align="right" style="font-weight: bold;">{{dato.deliveryDateFinal}}</h5>
                    <h6 align="right">tiempo restante: {{dato.tiempoFaltante}} dias</h6>
                    
                    </div>
                   
                 </div>
                 
                </div>
              </div>
            </vs-dialog>
           
    </div>

</div>
    </template>
    
   <script>
   import axios from 'axios'
   export default {
    data() {
        return {
          ejercicios:[],
          ejercicioMostar:[],
          ejerciciosEstudiante:[],
            active: false,
        infoUsuario:null,
        curso:null,
        pruebamil:[],
        mycolor: '#'
        }
    },
    mounted() {
      setInterval(this.vaciar, 10);
       this.infoUsuario= this.$store.state.userData
       if(this.infoUsuario.rol=='Estudiante'){
       axios.get('http://localhost:3001/areas')
       .then((response) => {
       this.curso=response.data
       this.prueba()
      })
      axios.get('http://localhost:3001/exercises')
       .then((response) => {
       this.ejercicios=response.data
       this.ejerEstu()
       
      })
                }
    },
    methods: {
      vuelveInicio(){     
      this.$router.push('/dashboard/welcome');
    },
      vaciar(){
if(this.active==false){
  this.ejercicioMostar=[];
}
      },
      cambiarEnvioTarea(index){
        
        this.$store.commit("setTareaEstudiante", this.ejercicioMostar[index]);
        this.$router.push('/dashboard/welcome/actividadEstudiante');
      },
      ejerEstu(){
        for (let i = 0; i < this.ejercicios.length; i++) {
    for (let j = 0; j < this.ejercicios[i].topic.length; j++) {
        if(this.ejercicios[i].topic[j]==this.infoUsuario.course[0].nomenclature){
          this.ejerciciosEstudiante.push(this.ejercicios[i])
      }
      
    }
        }
      },
      crearActividad(p){
      this.$store.commit("setAsignaturasDocente", this.infoUsuario.asignatures[p]);
        this.$router.push('/dashboard/creaActividades');

      },
      listarActividad(){
        this.$router.push('/dashboard/listaEjercicio');

      },
        prueba(){
          for (let i = 0; i < this.curso.length; i++) {
            for (let j = 0; j < this.curso[i].courses.length; j++) {
            if(this.curso[i].courses[j]==this.infoUsuario.course[0].grade){
                this.pruebamil.push(this.curso[i])
            }
            
          }
          }
        },
        generator(){
        this.mycolor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        
      },
      Cambia(index){
        this.generator()
        for (let i = 0; i < this.ejerciciosEstudiante.length; i++) {
        if(this.ejerciciosEstudiante[i].task_asignature[0]==this.pruebamil[index].name){
          const date =this.ejerciciosEstudiante[i].deliveryDateFinal;
          const dato =this.ejerciciosEstudiante[i].deliveryDateInicial;
          const brusco =date[0]+date[1]+date[2]+date[3]+date[4]+date[5]+date[6]+date[7]+date[8]+date[9];
          const bruscoInicio =dato[0]+dato[1]+dato[2]+dato[3]+dato[4]+dato[5]+dato[6]+dato[7]+dato[8]+dato[9];
          this.ejerciciosEstudiante[i].deliveryDateFinal=brusco;
          this.ejerciciosEstudiante[i].deliveryDateInicial=bruscoInicio;
          const fechaInicio = new Date().getTime();
          const fechaFin    = new Date(this.ejerciciosEstudiante[i].deliveryDateFinal).getTime();
          const diff = fechaFin - fechaInicio;
          const tiempoFaltante=Math.round(diff/(1000*60*60*24))+1;
          this.ejerciciosEstudiante[i].tiempoFaltante=tiempoFaltante;
          this.ejercicioMostar.push(this.ejerciciosEstudiante[i])
        }
        }
        this.active=true;
      }
    },
   }
   </script>
    
    <style scoped>

    ul{
        display: flex;

    }
    
    .fondosub{
        float:left;
      background-image:url("../../assets/CARD.png");
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 24px;
      font-weight: 700;
      width: 300px; 
      height: 200px;
      margin: 6px;
      transition: all 0.3s ease; 
      text-decoration: underline;
    }
    .fondosubP{
     border-radius: 20px;
    }
    .fondosub:hover{
        cursor: pointer;
        width: 350px; 
        height: 250px;
       
   }

    .div{
        list-style-type: none;
        
    }
    
.dialogo{
    width: 100%;
    height: 100%;
   
}

.yerlis::-webkit-scrollbar {
    
    width: 12px;               /* width of the entire scrollbar */
  }
  
  
  
  .yerlis::-webkit-scrollbar-thumb {
    background-color: gray;    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
    border: 3px solid gray;  /* creates padding around scroll thumb */
  }
  .pruebaColor{
    margin-right:10px;
    height:80px;float:left;
     width: 20px;
       border-radius:20px;
  }
</style>