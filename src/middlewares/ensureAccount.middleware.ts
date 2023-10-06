import { Repository } from 'typeorm';
import { Pub, Client } from '../entities';
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';

const ensurePubAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const pubRepository: Repository<Pub> = AppDataSource.getRepository(Pub);
    const usuarioId = parseInt(res.locals.usuarioId);
    const usuario: Pub | null = await pubRepository.findOneBy({ id: usuarioId });
    const id = parseInt(req.params.id)
  
    if (!usuario) {
      throw new AppError('Usuario não encontrado', 404);
    }
  
    if (usuario.id !== id) { 
      throw new AppError('Não autorizado, acesso somente a conta de mesma titularidade.', 403) 
    }; 
  
    return next();
};

const ensureClientAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
  const usuarioId = parseInt(res.locals.usuarioId);
  const usuario: Client | null = await clientRepository.findOneBy({ id: usuarioId });
  const id = parseInt(req.params.id)

  if (!usuario) {
    throw new AppError('Usuario não encontrado', 404);
  }

  if (usuario.id !== id) { 
    throw new AppError('Não autorizado, acesso somente a conta de mesma titularidade.', 403) 
  }; 

  return next();
};

export { ensurePubAccount, ensureClientAccount }