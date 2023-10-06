import { Request, Response } from "express";
import { iRegisteredClientRequest, iRegisteredClientResponse, iUniqueRegisteredClientRequest } from "../interfaces/registeredClients.interfaces";
import { createRegisterClientService } from "../services/registeredClients/pubs/createRegisterClient.service";
import { listRegisterClientService } from "../services/registeredClients/pubs/listRegisterClient.service";
import { listRegisterClientUniqueService } from "../services/registeredClients/pubs/listRegisterClientUnique.service";
import { updateRegisterClientService } from "../services/registeredClients/pubs/updateRegisterClient.service";
import { deleteRegisterClientService } from "../services/registeredClients/pubs/deleteRegisterClient.service";
import { listRegisterClientUniqueForClientService } from "../services/registeredClients/clients/listRegisterClientForClient.service";
import { updateRegisterClientForClientService } from "../services/registeredClients/clients/updateRegisterClientForClient.service";

const createRegisterClientController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const registerClientData: iRegisteredClientRequest = req.body;
  const newRegisterClient: iRegisteredClientResponse = await createRegisterClientService(registerClientData, pubId);

  return res.status(201).json(newRegisterClient);
};

const listRegisterClientController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const registeredClients = await listRegisterClientService(pubId);

  return res.status(200).json(registeredClients);
};

const listRegisterClientUniqueController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const registerClientData: iUniqueRegisteredClientRequest = req.body;
  const registerClient = await listRegisterClientUniqueService(registerClientData, pubId);

  return res.status(200).json(registerClient);
};

const updateRegisterClientController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const registerClientId: number = parseInt(req.params.id);
  const newRegisterClient: iRegisteredClientResponse = await updateRegisterClientService(registerClientId, req.body, pubId);

  return res.status(200).json(newRegisterClient);
};

const deleteRegisterClientController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const registerClientId: number = parseInt(req.params.id);
  await deleteRegisterClientService(registerClientId, pubId);

  return res.status(204).send();
};


const listRegisterClientUniqueForClientController = async (req: Request, res: Response): Promise<Response> => {
  const clientId = parseInt(res.locals.usuarioId);
  const registerClientData: iUniqueRegisteredClientRequest = req.body;
  const registerClient = await listRegisterClientUniqueForClientService(registerClientData, clientId);

  return res.status(200).json(registerClient);
};

const updateRegisterClientForClientController = async (req: Request, res: Response): Promise<Response> => {
  const clientId = parseInt(res.locals.usuarioId);
  const registerClientId: number = parseInt(req.params.id);
  const newRegisterClient: iRegisteredClientResponse = await updateRegisterClientForClientService(registerClientId, req.body, clientId);

  return res.status(200).json(newRegisterClient);
};

export {
  createRegisterClientController,
  listRegisterClientController,
  listRegisterClientUniqueController,
  updateRegisterClientController,
  deleteRegisterClientController,
  listRegisterClientUniqueForClientController,
  updateRegisterClientForClientController,
};
