import { Request, Response } from "express";
import { iRescueHistoryRequest, iRescueHistoryResponse, iSearchRescueHistory } from "../interfaces/rescueHistory.interfaces";
import { listRescueHistoryForPubService } from "../services/rescueHistory/pubs/listRescueHistoryForPub.service";
import { updateRescueHistoryForPubService } from "../services/rescueHistory/pubs/updateRescueHistoryForPub.service";
import { createRescueHistoryService } from "../services/rescueHistory/clients/createRescueHistory.service";
import { listRescueHistoryService } from "../services/rescueHistory/clients/listRescueHistory.service";
import { deleteRescueHistoryService } from "../services/rescueHistory/clients/deleteRescueHistory.service";
import { listSearchRescueHistoryForPubService } from "../services/rescueHistory/pubs/listSearchHistoryForPub.service";

const listRescueHistoryForPubController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const clientId: number = parseInt(req.params.id);
  const registerClient = await listRescueHistoryForPubService(clientId, pubId);

  return res.status(200).json(registerClient);
};

const listSearchRescueHistoryForPubController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const clientId: number = parseInt(req.params.id);
  const data: iSearchRescueHistory = {
    code_rescue: req.params.codeRescue
  }
  const registerClient = await listSearchRescueHistoryForPubService(clientId, pubId, data);

  return res.status(200).json(registerClient);
};

const updateRescueHistoryForPubController = async (req: Request, res: Response): Promise<Response> => {
  const pubId = parseInt(res.locals.usuarioId);
  const rescueHistoryId: number = parseInt(req.params.id);
  const newRescueHistory: iRescueHistoryResponse = await updateRescueHistoryForPubService(rescueHistoryId, req.body, pubId);

  return res.status(200).json(newRescueHistory);
};




const createRescueHistoryForClientController = async (req: Request, res: Response): Promise<Response> => {
  const clientId = parseInt(res.locals.usuarioId);
  const pubId = parseInt(req.params.id)
  const registerClientData: iRescueHistoryRequest = req.body;
  const newRegisterClient: iRescueHistoryResponse = await createRescueHistoryService(registerClientData, clientId, pubId);

  return res.status(201).json(newRegisterClient);
};

const listRescueHistoryForClientController = async (req: Request, res: Response): Promise<Response> => {
  const clientId = parseInt(res.locals.usuarioId);
  const rescueHistory = await listRescueHistoryService(clientId);

  return res.status(200).json(rescueHistory);
};

const deleteRescueHistoryForClientController = async (req: Request, res: Response): Promise<Response> => {
  const clientId = parseInt(res.locals.usuarioId);
  const rescueHistoryId: number = parseInt(req.params.id);
  await deleteRescueHistoryService(rescueHistoryId, clientId);

  return res.status(204).send();
};


export {
  listRescueHistoryForPubController,
  updateRescueHistoryForPubController,
  createRescueHistoryForClientController,
  listRescueHistoryForClientController,
  deleteRescueHistoryForClientController,
  listSearchRescueHistoryForPubController
};
