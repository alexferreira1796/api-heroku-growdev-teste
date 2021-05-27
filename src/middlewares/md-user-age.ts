import { Request, Response, NextFunction } from "express";

function validarIdade(req: Request, res: Response, next: NextFunction) {
  const { age }: { age: number } = req.body;

  if (!age) {
    return res.status(400).json({
      msg: "Idade deve ser informada",
    });
  }

  if (age < 0) {
    return res.status(400).json({
      msg: "Idade inválida",
    });
  }

  next();
}

export default validarIdade;
