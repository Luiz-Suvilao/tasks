require('dotenv').config();
const nodemailer = require('nodemailer');

export default async function (req, res) {
    const {
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
            <h3>Envio de sugestão!</h3>
           <p>Muito obrigado por enviar sua sugestão. Pode ter certeza que nossa equipe irá ler com todo carinho <3</p>

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
