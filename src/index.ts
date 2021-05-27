import express, {Request, Response} from 'express';
import cors from 'cors';
import { validate as uuidValidate } from 'uuid';

import User from "./classes/User";
import IUser from "./interfaces/UserInterface";
import validarIdade from "./middlewares/md-user-age";
import validarCPF from "./middlewares/md-user-cpf";
import validarEmail from "./middlewares/md-user-email";
import validarNome from "./middlewares/mid-user-name";
import validaID from "./middlewares/md-valid-id";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Array de objeto Usuarios
let listUsers: Array<User> = [];

const users = [
  {
    name: 'Julio',
    email: 'julio@julio.com',
    document: '11111111111',
    age: 24
  },
  {
    name: 'Aline',
    email: 'aline@aline.com',
    document: '00000000000',
    age: 21
  },
  {
    name: 'Maria',
    email: 'maria@maria.com',
    document: '22222222222',
    age: 39
  }
];
users.map(({name, email, document, age}) => {
  listUsers.push(
    new User(name, document, email, age)
  )
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`
  <body style='margin:0;padding:0'>
      <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
        <h1 style='font-size:60px;font-weigth:600'>🚀 API - Transações</h1>
      </div>
  </body>
  `);
});
// Lista todos os usuários
app.get("/users", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: listUsers.map((m) => {
      return m.getUser();
    }),
  });
});

// Salvar usuario
app.post(
  "/user",
  validarNome,
  validarEmail,
  validarCPF,
  validarIdade,
  (req: express.Request, res: express.Response) => {
    const { name, cpf, email, age }: IUser = req.body;

    const existe = listUsers.find((f) => f.cpf === cpf);
    if (existe) {
      return res.status(400).json({
        msg: "CPF já cadastrado",
      });
    }

    const user = new User(name, cpf, email, age);
    listUsers.push(user);

    return res.status(201).json({
      success: true,
      data: user,
    });
  }
);

app.get("/user/:id", (req: Request, res: Response) => {
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

  const user = listUsers.find((f) => f.id === id);
  if (!user) {
    return res.status(400).json({
      msg: "Usuário não encontrado",
    });
  }

  return res.status(200).json({
    status: 200,
    data: user
  })

});

// Editar usuario
app.put("/user/:id", validaID, (req: Request, res: Response) => {
  const {id}: {id?: string} = req.params;

  const { name, cpf, email, age }: IUser = req.body;
  const indiceUser: number = listUsers.findIndex((item) => item.id === id);
 
  if(indiceUser < 0) {
    return res.status(400).json({
      msg: "Usuário não encontrado",
    });
  }
  const newData = {id, name, cpf, email, age}
  listUsers[indiceUser].editUser(newData);

  res.status(200).json(listUsers[indiceUser]);

});

// Delete
app.delete("/user/:id", validaID, (req: Request, res: Response) => {
  const {id}: {id?: string} = req.params;

  const indice = listUsers.findIndex((f) => f.id === id);
  if (indice < 0) {
    return res.status(400).json({
      msg: "Usuário não encontrado",
    });
  }

  listUsers.splice(indice, 1);

  return res.status(200).json({
    msg: "Usuário excluído com sucesso!"
  })

});

app.listen(process.env.PORT || '3000', () => {
  //console.log("server up");
})