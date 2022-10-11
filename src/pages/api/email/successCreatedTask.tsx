import { format } from 'date-fns';

export default function (req, res) {
    require('dotenv').config();
    const nodemailer = require('nodemailer');
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
            <h3>${req.body.isUpdate ? 'Atualização' : 'Criação'} de tarefa!</h3>
            <p>A tarefa <strong>${req.body.task}</strong> foi ${req.body.isUpdate ? 'atualizada' : 'criada'} com sucesso!</p>

            <h4>Fale comigo através das seguintes redes</h4>
            <a href="https://www.instagram.com/luiz_filipe.dev/">Instagram</a> ou <a href="https://www.linkedin.com/in/luiz-filipe-490a02182/">Linkedin</a>        
        </div>
    `;
    const mailData = {
        from: 'luizfilipe.tech@gmail.com',
        to: 'suvilao@gmail.com',
        subject: `Olá ${req.body.userName}!`,
        html
    };

    try {
        transporter.sendMail(mailData, (err, info) => {
            if(err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully', info);
            }
        });
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}
