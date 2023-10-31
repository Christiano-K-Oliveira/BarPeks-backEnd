import { createTransport } from "nodemailer";
import { iEmailRequest } from "../interfaces/resetPassword.interfaces";
import { AppError } from "../errors";
import Mailgen from "mailgen";

class EmailService {
    async senEmail({ to, subject, text }: iEmailRequest){
        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await transporter.sendMail({
            from: 'barperks68@gmail.com',
            to,
            subject,
            html: text
        }).then(() => {
            console.log('Email enviado com sucesso')
        }).catch((err) => {
            console.log(err)
            throw new AppError('Erro ao tentar enviar o email, tente novamente mais tarde', 500)
        })
    }

    resetPasswordClientTemplate(userName: string, userEmail: string, resetToken: string) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Bar Perks',
                link: `https://barperks.vercel.app`
            }
        });

        const email = {
            body: {
                name: userName,
                intro: 'Bem-vindo ao recuperador de senha do BarPerks! Estamos muito entusiasmados por ter você a bordo.',
                action: {
                    instructions: 'Para recuperar sua senha, clique aqui:',
                    button: {
                        color: '#22BC66',
                        text: 'Recuperar senha',
                        link: `https://barperks.vercel.app/recuperar-senha/cliente/${resetToken}`
                    }
                },
                outro: 'Necessita de ajuda ou tem dúvidas? Basta responder a este e-mail. Teremos todo o gosto em ajudar.'
            }
        };

        const emailBody = mailGenerator.generate(email);
        const emailTemplate = {
            to: userEmail,
            subject: 'Recuperar Senha',
            text: emailBody,
        }

        return emailTemplate
    }
    resetPasswordPubTemplate(userName: string, userEmail: string, resetToken: string) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Bar Perks',
                link: `https://barperks.vercel.app/`
            }
        });

        const email = {
            body: {
                name: userName,
                intro: 'Bem-vindo ao recuperador de senha do BarPerks! Estamos muito entusiasmados por ter você a bordo.',
                action: {
                    instructions: 'Para recuperar sua senha, clique aqui:',
                    button: {
                        color: '#22BC66',
                        text: 'Recuperar senha',
                        link: `https://barperks.vercel.app/recuperar-senha/estabelecimento/${resetToken}`
                    }
                },
                outro: 'Necessita de ajuda ou tem dúvidas? Basta responder a este e-mail. Teremos todo o gosto em ajudar.'
            }
        };

        const emailBody = mailGenerator.generate(email);
        const emailTemplate = {
            to: userEmail,
            subject: 'Recuperar Senha',
            text: emailBody,
        }

        return emailTemplate
    }
}

const emailService = new EmailService()

export { emailService }