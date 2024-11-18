import nodemailer from "nodemailer";

const olvideClave = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  //Enviar el email
  const info = await transporter.sendMail({
    from: "Administrador de incidencias",
    to: email,
    subject: "Restablecer clave de Administrador de Incidencias",
    text: "Restablecer clave de Administrador de Incidencias",
    html: `<p>Hola, ${name}</p>
    <p>Has solicitado cambio de clave, sigue el siguiente enlace para generar una nueva clave:
    <a href="${process.env.FRONTEND_URL}/olvide-clave/${token}">Restablecer clave</a> </p>

    <p>Si no reconoces este email puedes ignorar este mensaje</p>
    `,
  });

  console.log("Mensaje enviado.. %s", info.messageId);
};

export default olvideClave;
