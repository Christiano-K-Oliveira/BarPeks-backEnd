"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = require("nodemailer");
const errors_1 = require("../errors");
const mailgen_1 = __importDefault(require("mailgen"));
class EmailService {
    senEmail({ to, subject, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, nodemailer_1.createTransport)({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            yield transporter.sendMail({
                from: 'barperks68@gmail.com',
                to,
                subject,
                html: text
            }).then(() => {
                console.log('Email enviado com sucesso');
            }).catch((err) => {
                console.log(err);
                throw new errors_1.AppError('Erro ao tentar enviar o email, tente novamente mais tarde', 500);
            });
        });
    }
    resetPasswordClientTemplate(userName, userEmail, resetToken) {
        const mailGenerator = new mailgen_1.default({
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
        };
        return emailTemplate;
    }
    resetPasswordPubTemplate(userName, userEmail, resetToken) {
        const mailGenerator = new mailgen_1.default({
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
        };
        return emailTemplate;
    }
}
const emailService = new EmailService();
exports.emailService = emailService;
