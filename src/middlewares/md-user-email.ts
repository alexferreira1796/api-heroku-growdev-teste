import { Request, Response, NextFunction } from "express";

function validarEmail(req: Request, res: Response, next: NextFunction) {
  const { email }: { email: string } = req.body;

  if (!email) {
    return res.status(400).json({
      msg: "Email deve ser informado",
    });
  }

  if (email.indexOf("@") === -1) {
    return res.status(400).json({
      msg: "Email inválido",
    });
  }

  next();
}

export default validarEmail;
