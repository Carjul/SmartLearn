<template>
  <v-app-bar
    app
    elevate-on-scroll
    elevation="8"
    relative
  >
    <!-- La imagen del navbar -->
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        src="../../assets/Tulbar.png"
      ></v-img>
    </template>

    <!-- El botón de menú -->
    <v-app-bar-nav-icon class="btn" dark @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="font-weight-bold letra text-h5 mx-2"></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" style="cursor: pointer" class="mx-5 mr-10">
          <!-- Imagen de perfil -->
          <v-avatar size="40">
            <img src="https://media.licdn.com/dms/image/D4E03AQFEd30hUG5bbQ/profile-displayphoto-shrink_800_800/0/1682819137100?e=2147483647&v=beta&t=GlRmWrlXnSvIiTUe3bk_QLveYgoxJ323zinvRAd0sXE" />
          </v-avatar>
        </span>
      </template>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" @click="handleItemClick(item)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {id:1, text: 'Perfil', icon: 'mdi-clock' },
        {id:2, text: 'Salir', icon: 'mdi-account' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      console.log("Generado");
      // Lógica para abrir/cerrar el cajón (drawer) aquí
      this.$emit('handrawer');
    },
    handleItemClick(item) {
      if (item.text ==='Salir') {
         
        console.log("Salir");

      }else{
        this.$router.push('/perfil');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.letra {
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 500;
}
</style>
