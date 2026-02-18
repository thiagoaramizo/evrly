export class User {
  private id?: number;
  private nome: string; //128
  private email: string; //255
  private phone: string; //20

  constructor(params: { id?: number, nome: string, email: string, phone: string }) {
    this.id = params.id;
    this.nome = params.nome;
    this.email = params.email;
    this.phone = params.phone;
  }
}