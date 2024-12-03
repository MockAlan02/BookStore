var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port : 587,
  auth: {
    user: "yuipoi639@gmail.com",
    pass: "bzinaqzzxqxlbwbc",
  },
  tls : {
    rejectUnauthorized : false
  }
});

function sendEmail(Email, book) {
  var mailOptions = {
    from: process.env.EmailUser,
    to: Email,
    subject: "¡Se ha agregado un nuevo libro en nuestra página!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">¡Hola!</h2>
        <p>Nos complace informarte que se ha agregado un nuevo libro a nuestra colección en la página. Aquí tienes los detalles:</p>
        <h3 style="color: #007bff;">${book}</h3>
        <p>Visita nuestro sitio para obtener más información sobre este y otros libros que te puedan interesar.</p>
        <p>Gracias por ser parte de nuestra comunidad de lectores.</p>
        <p style="margin-top: 20px;">Saludos cordiales,<br><strong>Tu Equipo de la Página de Libros</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <footer style="font-size: 12px; color: #777;">
          <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
          <p>Si tienes alguna pregunta, visita nuestra <a href="#" style="color: #007bff; text-decoration: none;">página de contacto</a>.</p>
        </footer>
      </div>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendEmail: sendEmail,
};
