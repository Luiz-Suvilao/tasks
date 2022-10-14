require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function (req, res) {
    const {
        isUpdate,
        task,
        userName,
        email
    } = await req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        secure: true,
    });

    const html = `
        <div>
            <h3>${isUpdate ? 'Atualização' : 'Criação'} de tarefa!</h3>
            <p>A tarefa <strong>${task}</strong> foi ${isUpdate ? 'atualizada' : 'criada'} com sucesso!</p>

            <h4>Fale comigo através das seguintes redes</h4>
            <a href="https://www.instagram.com/luiz_filipe.dev/">Instagram</a> ou <a href="https://www.linkedin.com/in/luiz-filipe-490a02182/">Linkedin</a>        
        </div>
    `;

    return await new Promise((resolve, reject) => {
        const mailData = {
            from:  process.env.EMAIL,
            to: String(email),
            subject: `Olá, ${userName}!`,
            html
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
                res.status(500).json({ success: false, err});
                return;
            }
            resolve(info);
        });
    }).then(() => {
        res.status(200).json({ success: true });
    }).catch(e => {
        res.status(500).json({ success: false, e});
    })
}
