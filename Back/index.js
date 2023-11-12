const { app } = require("./bin/Routes");
const {buscarTarea,sendSms} = require("./bin/services/enviarCorreo");
const schedule = require('node-schedule');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server on ", PORT);
});


sendSms("+573146491024", "Hola prueba con node")
const job = schedule.scheduleJob('59 23 * * *', function(){
  console.log('Tarea de envio de alertas, todos los días a las 11:59 PM');
  buscarTarea()
});

  