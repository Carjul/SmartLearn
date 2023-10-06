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


     <div class="container">
        <div class="row">
       
             <div class="col-md-4" v-for="(item) in noticies" :key="item._id">
                <div class="card">
                    <div class="card-header">
                        <h3>{{item.title}}</h3>
                    </div>
                    <div class="card-body">
                        <img :src="item.imagen" alt="" class="img-fluid">
                        <p v-html="item.content"> </p>
                        <p>{{Estado(item.estado[0])}}</p>
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
        noticieState: [],
        noticies:[],
        estados:[]
       }
    ),
    methods: {
                 
        //mostrar estado en html

        Estado(id){
            console.log("ww",id,this.estados)
            for (let i = 0; i < this.estados.length; i++) {
                if (this.estados[i]._id == id) {
                    console.log(this.estados[i].description)
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
         getNotices() {
            try {
               axios.get("http://localhost:3001/notices").then((response) => {
                    this.noticies = response.data;
                    console.log(this.noticies)
                    
    
               })


            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.getNotices();
        this.getState()
       

}
}
</script>
<style></style>