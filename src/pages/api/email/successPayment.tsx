import { format } from 'date-fns';

export default function (req, res) {
    require('dotenv').config();
    const nodemailer = require('nodemailer');

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
            <h3>Pagamento efetuado com sucesso!</h3>
            <p>Muito obrigado por contribuir! Em breve sua imagem de usuário irá estar estampada em nossa home 😎</p>

            <p>Ainda tem mais, você também agora poderá editar e acessar os detalhes de uma tarefa 🤓🥳</p>
            
            <h4>Informações de pagamento</h4>
            <p>O pagamento foi realizado no nome de ${req.body.payer.name.given_name} ${req.body.payer.name.surname} em ${format(new Date(), 'dd MMMM yyyy')}</p>

            <h4>Fale comigo através das seguintes redes</h4>
            <a href="https://www.instagram.com/luiz_filipe.dev/">Instagram</a> ou <a href="https://www.linkedin.com/in/luiz-filipe-490a02182/">Linkedin</a>        
        </div>
    `;
    const mailData = {
        from: 'luizfilipe.tech@gmail.com',
        to: 'suvilao@gmail.com',
        subject: `Olá ${req.body.name}, estamos confirmando seu pagamento de R$ 1,00`,
        html
    };

    transporter.sendMail(mailData, (err, info) => {});

    return res.status(200).json({success: true});
}
