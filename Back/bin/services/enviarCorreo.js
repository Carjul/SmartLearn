const Exercise = require("../models/Exercise");
const Course = require("../models/Course");
const People = require("../models/People");
const { transporter } = require('../config/nodeMailer')
const accountSid = 'AC60a5e5949bbc44ebd5457707bc9e4c81';
const authToken = '21a17058399d6cbe85d37f64c6c2265a';
const client = require('twilio')(accountSid, authToken);



const sendMail = async (correo,nombreAct) => {
    await transporter.sendMail({
        from: '"Alerta temprana" <smartlearnvirtual2.0@gmail.com>',
        to: correo,
        subject: "Actividad Proxima a vencer ✔",
        html: `<div><h3>Tareas proximas a vercer</h3>
        <p><strong>Estimado estudiante la actividad ${nombreAct} pronto vencera</strong> </p>
`
    });
}

const sendSms = (num, mensaje) => {
    

  const apiSecret = "d8d3d81584defe35efbe4dd773500081bd829c65";

  const message = {
    secret: apiSecret,
    mode: "devices",
    device: "00000000-0000-0000-dbc8-92cc3dd5d817",
    sim: 1,
    priority: 1,
    phone: num,
    message: mensaje,
  };
  
  const url = "https://sms.uncgateway.com/api/send/sms";
  
  const queryString = Object.keys(message)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(message[key]))
    .join("&");
  
  fetch(`${url}?${queryString}`, {
    method: "POST",
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
 
function calcularDiferenciaDeDias(fechaObjetivo) {
    const fechaActual = new Date();
    const fechaObjetivoDate = new Date(fechaObjetivo);
    const diferenciaEnMilisegundos = fechaObjetivoDate - fechaActual;
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
}

async function buscarTarea() {
    var estudianteNoEnv = []
   
    const estudiantes = await People.find({ rol: "Estudiante" }).populate('Acudientes')
    const data = await Exercise.find({ task_status: 'Tarea Habilitada' }).populate('topic').populate('enviados')

    const resultados = data.filter((item) => {
        const diferencia = calcularDiferenciaDeDias(item.deliveryDateFinal);
        return diferencia === 2;
    }); 
   
//enviaron la actividad

resultados.forEach(element => {
    element.enviados.forEach(e => {
        if (e.trabajos.length > 0) {
            e.trabajos.forEach(t => {
                estudianteNoEnv = estudiantes.filter(item => !item._id.equals(t.people_id));
                // Hacer algo con estudianteNoEnv si es necesario
            });
        }
    });
});
   
   
const ejercicioEstudiantesArray = [];

// Iterar a través de los ejercicios
resultados.forEach((ejercicio) => {
  // Crear un objeto para almacenar el ejercicio y los estudiantes relacionados
  const ejercicioEstudiantes = {
    ...ejercicio,
    estudiantesRelacionados: [],
  };

  // Iterar a través de los estudiantes
  estudianteNoEnv.forEach((estudiante) => {
    // Verificar si el estudiante pertenece al curso del ejercicio
    if (
      ejercicio.topic.some((cursoEjercicio) =>
        estudiante.courestu.nomenclature === cursoEjercicio.nomenclature
      )
    ) {
      // Agregar al estudiante al ejercicio actual
      ejercicioEstudiantes.estudiantesRelacionados.push(estudiante);
    }
  });

  // Agregar el objeto al array si tiene estudiantes relacionados
  if (ejercicioEstudiantes.estudiantesRelacionados.length > 0) {
    ejercicioEstudiantesArray.push(ejercicioEstudiantes);
  }
});
 


for (let i = 0; i < ejercicioEstudiantesArray.length; i++) {
    const element = ejercicioEstudiantesArray[i];
    for (let j = 0; j < element.estudiantesRelacionados.length; j++) {
        const estudiante = element.estudiantesRelacionados[j];
        
        // Validar si el estudiante tiene un nombre de usuario y el elemento tiene un título de tarea
        if (estudiante.username && element._doc.task_title) {
            sendMail(estudiante.username, element._doc.task_title);
        }
        
        // Validar si el estudiante tiene un acudiente con un número de celular
       /*  if (estudiante.Acudientes && estudiante.Acudientes.celular) {
            sendSms(`+57${estudiante.Acudientes.celular}`, `Estimado Acudiente el estudiante ${estudiante.name} debe, la actividad ${element._doc.task_title} que pronto vencera`);
        } */
    }
}

}





module.exports = { buscarTarea,sendSms }