import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { randomUUID } from "node:crypto";
import { emailService } from "../../utils/sendEmail.utils";
import { Pub } from "../../entities";
import { updateResetPasswordPubService } from "./updatePub.service";

export const sendEmailResetPasswordPubService = async (email: string) : Promise<void> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const pub: Pub | null = await pubRepository.findOneBy({
        email: email
    })
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    if(!pub){
        throw new AppError('Bar não encontrado', 404)
    }

    const resetToken = randomUUID();
    const data = {
        reset_password: resetToken,
        expires_reset_password: today.toLocaleDateString()
    }
    await updateResetPasswordPubService(pub.id, data)

    const resetPasswordTemplate = emailService.resetPasswordPubTemplate(pub.name, pub.email, resetToken)
    await emailService.senEmail(resetPasswordTemplate)
}