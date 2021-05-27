import { Request, Response, NextFunction } from "express";
import { validate as uuidValidate } from 'uuid';

function validaID(req: Request, res: Response, next: NextFunction) {
  const {id}: {id?: string} = req.params;

  if (!id) {
    return res.status(400).json({
      msg: "ID deve ser informado",
    });
  }

  if (!uuidValidate(id)) {
    return res.status(400).json({
      msg: "ID inválido",
    });
  }

  next();
}

export default validaID;
