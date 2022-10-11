require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function (req, res) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        secure: true,
    });

    const html = `
        <div>
            <h3>${req.body.isUpdate ? 'Atualização' : 'Criação'} de tarefa!</h3>
            <p>A tarefa <strong>${req.body.task}</strong> foi ${req.body.isUpdate ? 'atualizada' : 'criada'} com sucesso!</p>

            <h4>Fale comigo através das seguintes redes</h4>
            <a href="https://www.instagram.com/luiz_filipe.dev/">Instagram</a> ou <a href="https://www.linkedin.com/in/luiz-filipe-490a02182/">Linkedin</a>        
        </div>
    `;
    const mailData = {
        from: 'luizfilipe.tech@gmail.com',
        to: req.body.email,
        subject: `Olá ${req.body.userName}!`,
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
