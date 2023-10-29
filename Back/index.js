const { app } = require("./bin/Routes");
const { transporter } = require('./bin/config/nodeMailer')
const schedule = require('node-schedule');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server on ", PORT);
});

const sendMail = async (correo) => {
    await transporter.sendMail({
        from: '"Alerta temprana" <smartlearnvirtual2.0@gmail.com>',
        to: correo,
        subject: "Actividad Proxima a vencer ✔",
        html: `<div><h3>correo de preuba</h3>
        <p>Username: <strong>soy un cacahuate2 </strong> </p>
`
    });
}


const job = schedule.scheduleJob(' 12 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
