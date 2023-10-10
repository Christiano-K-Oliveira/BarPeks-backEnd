import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Client } from '../../entities';
import { AppError } from '../../errors';
import jwt from 'jsonwebtoken'
import { iLogin, iLoginEmail } from '../../interfaces/login.interfaces';

export const loginClientService = async (loginData: iLogin): Promise<string> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const findClient: Client | null = await clientRepository.findOne({
        where: {
            email: loginData.email
        }
    });

    if (!findClient) {
		throw new AppError('Credenciais inválidas!', 403);
	}

    const matchPassword: boolean = await compare(loginData.password, findClient.password)
    
    if (!matchPassword) {
        throw new AppError('Credenciais inválidas!', 403)
    }

    const token = jwt.sign(
        {           
            id: findClient.id,
            nome: findClient.name,
            email: findClient.email,
            photo_url: findClient.photo_url,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(findClient.id)
        }
    )
    return token
}


export const loginSocialMediaClientService = async (loginData: iLoginEmail): Promise<string> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);

	const findClient: Client | null = await clientRepository.findOne({
        where: {
            email: loginData.email
        }
    });

    if (!findClient) {
		throw new AppError('Cliente não encontrado', 404);
	}

    const token = jwt.sign(
        {           
            id: findClient.id,
            nome: findClient.name,
            email: findClient.email,
            photo_url: findClient.photo_url,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(findClient.id)
        }
    )
    return token
}