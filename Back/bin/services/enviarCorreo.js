const Exercise = require("../models/Exercise");
const Course = require("../models/Course");
const People = require("../models/People");
const { transporter } = require('../config/nodeMailer')
const accountSid = 'AC60a5e5949bbc44ebd5457707bc9e4c81';
const authToken = '21a17058399d6cbe85d37f64c6c2265a';
const client = require('twilio')(accountSid, authToken);
const ObjectId = require('mongoose').Types.ObjectId;


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

const sendSms = (num, message) => {
    client.messages
        .create({
            from: '+18174899770',
            to: num,
            body: message,
        })
        .then(message => {
            console.log(message.sid);
        })
        .catch(error => {
            console.error("Error al enviar el SMS:", error);
        });

}
/* sendSms("+573146491024","mensaje e prueba") */


async function buscarTarea() {
    var cousrestu = []
    var cursos = []
    const estudiantes = await People.find({ rol: "Estudiante" })
    const data = await Exercise.find({ task_status: 'Tarea Habilitada' })

    const resultados = data.filter((item) => {
        const diferencia = calcularDiferenciaDeDias(item.deliveryDateFinal);
        return diferencia === 2;
    });

    for (let j = 0; j < data.length; j++) {
        const element = data[j];
        for (let i = 0; i < element.topic.length; i++) {
            const e = element.topic[i];
            const courses = await Course.findOne({ _id: e })
            if (courses) { cursos.push(courses) }

        }
    }
    let CursosNoRepetidos = cursos.filter((elem, index, self) => {
        const indexActual = self.findIndex((t) => t._id.equals(elem._id));
        return index === indexActual;
    });

    for (let i = 0; i < CursosNoRepetidos.length; i++) {
        const element = CursosNoRepetidos[i];
        for (let j = 0; j < estudiantes.length; j++) {
            const estudiante = estudiantes[j];
            if (estudiante.courestu.equals(element._id)) {
                cousrestu.push(estudiante)
            }
        }
    }
    console.log(cousrestu);
   
    
    console.log(resultados);
}


function calcularDiferenciaDeDias(fechaObjetivo) {
    const fechaActual = new Date();
    const fechaObjetivoDate = new Date(fechaObjetivo);
    const diferenciaEnMilisegundos = fechaObjetivoDate - fechaActual;
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
}



module.exports = { sendMail, sendSms, buscarTarea }