import { v4 as uuid } from 'uuid';

class User {
  public id: string;
  private name: string;
  public cpf: string;
  private email: string;
  private age: number;

  constructor(name: string, cpf: string, email: string, age: number) {
    this.id = uuid();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.age = age;
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      cpf: this.cpf,
    };
  }

  editUser(param: any): void {
    this.name = param.name;
    this.cpf = param.cpf;
    this.email = param.email;
    this.age = param.age;
  }
}

export default User;