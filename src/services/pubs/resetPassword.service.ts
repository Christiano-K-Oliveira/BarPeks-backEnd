import { hashSync } from "bcryptjs"
import { AppDataSource } from "../../data-source"
import { Pub } from "../../entities"
import { AppError } from "../../errors"

export const resetPasswordService = async (password: string, resetToken: string): Promise<void> => {
    const pubRepository = AppDataSource.getRepository(Pub)
    const pub: Pub | null = await pubRepository.findOneBy({
        reset_password: resetToken
    })
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed).toLocaleDateString()

    if(!pub?.expires_reset_password){
        throw new AppError('Token expirado')
    }

    const pubDate = pub.expires_reset_password.split('/')
    const currentDate = today.split('/')
    
    if(+pubDate[2] - +currentDate[2] < 0){
        throw new AppError('Token expirado')
    }
    
    if(+pubDate[1] - +currentDate[1] < 0){
        throw new AppError('Token expirado')
    }

    if(+pubDate[0] - +currentDate[0] < 0){
        throw new AppError('Token expirado')
    }

    if(!pub){
        throw new AppError('Bar não encontrado', 404)
    }

    const newDataPub = {
        ...pub,
        password: hashSync(password, 10),
        reset_password: null
    }

    await pubRepository.save(newDataPub)
}