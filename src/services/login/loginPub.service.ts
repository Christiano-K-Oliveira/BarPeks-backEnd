import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Pub } from '../../entities';
import { AppError } from '../../errors';
import jwt from 'jsonwebtoken'
import { iLogin } from '../../interfaces/login.interfaces';

export const loginPubService = async (loginData: iLogin): Promise<string> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);

	const findPub: Pub | null = await pubRepository.findOne({
        where: {
            email: loginData.email
        }
    });

    if (!findPub) {
		throw new AppError('Credenciais inválidas!', 403);
	}

    const matchPassword: boolean = await compare(loginData.password, findPub.password)
    
    if (!matchPassword) {
        throw new AppError('Credenciais inválidas!', 403)
    }

    const token = jwt.sign(
        {           
            id: findPub.id,
            nome: findPub.name,
            email: findPub.email,
            photo_url: findPub.photo_url,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(findPub.id)
        }
    )
    return token
}