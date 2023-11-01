const { app } = require("./bin/Routes");
const {buscarTarea} = require("./bin/services/enviarCorreo");
const schedule = require('node-schedule');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server on ", PORT);
});


const job = schedule.scheduleJob(' 12 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
 buscarTarea()
  