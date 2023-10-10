import { Repository } from "typeorm";
import { Client } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { randomUUID } from "node:crypto";
import { updateResetPasswordClientService } from "./updateClient.service";
import { emailService } from "../../utils/sendEmail.utils";

export const sendEmailResetPasswordClientService = async (email: string) : Promise<void> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
    const client: Client | null = await clientRepository.findOneBy({
        email: email
    })
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    if(!client){
        throw new AppError('Cliente não encontrado', 404)
    }

    const resetToken = randomUUID();
    const data = {
        reset_password: resetToken,
        expires_reset_password: today.toLocaleDateString()
    }
    await updateResetPasswordClientService(client.id, data)

    const resetPasswordTemplate = emailService.resetPasswordClientTemplate(client.name, client.email, resetToken)
    await emailService.senEmail(resetPasswordTemplate)
}