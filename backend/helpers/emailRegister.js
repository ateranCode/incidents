import nodemailer from "nodemailer";

const emailRegistro = async (data) => {
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
    subject: "Comprobar cuenta en Administrador de Incidencias",
    text: "Comprueba tu cuenta",
    html: `<p>Hola, ${name}</p>
    <p>Para confirmar la cuenta por favor selecciona el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a> </p>

    <p>Si no reconoces este email puedes ignorar este mensaje</p>
    `,
  });

  console.log("Mensaje enviado.. %s", info.messageId);
};

export default emailRegistro;
