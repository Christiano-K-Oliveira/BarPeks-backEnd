import { hashSync } from "bcryptjs"
import { AppDataSource } from "../../data-source"
import { Client } from "../../entities"
import { AppError } from "../../errors"

export const resetPasswordService = async (password: string, resetToken: string): Promise<void> => {
    const clientRepository = AppDataSource.getRepository(Client)
    const client: Client | null = await clientRepository.findOneBy({
        reset_password: resetToken
    })
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toLocaleDateString()

    if(!client?.expires_reset_password){
        throw new AppError('Token expirado')
    }

    const clientDate = client.expires_reset_password.split('/')
    const currentDate = today.split('/')
    
    if(+clientDate[2] - +currentDate[2] < 0){
        throw new AppError('Token expirado')
    }
    
    if(+clientDate[1] - +currentDate[1] < 0){
        throw new AppError('Token expirado')
    }
    
    if(+clientDate[0] - +currentDate[0] < 0){
        throw new AppError('Token expirado')
    }


    if(!client){
        throw new AppError('Cliente não encontrado', 404)
    }

    const newDataClient = {
        ...client,
        password: hashSync(password, 10),
        reset_password: null
    }

    await clientRepository.save(newDataClient)
}