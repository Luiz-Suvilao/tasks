require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function (req, res) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        secure: true,
    });

    const html = `
        <div>
            <h3>Login efetuado com sucesso! Aproveite nossa plataforma :)</h3>
            <p>Qualquer dúvida ou sugestão, responda esse endereço eletrônico. Teremos o maior prazer em ouvi-lo(a)</p>
            
            <h4>Fale comigo através das seguintes redes</h4>
            <a href="https://www.instagram.com/luiz_filipe.dev/">Instagram</a> ou <a href="https://www.linkedin.com/in/luiz-filipe-490a02182/">Linkedin</a>        
        </div>
    `;
    const mailData = {
        from: 'luizfilipe.tech@gmail.com',
        to: req.body.email,
        subject: `Olá ${req.body.name}!`,
        html
    };

    return await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            console.log(info);
            resolve(info);
        });
    }).then(() => {
        res.status(200).json({ success: true });
    });
}
