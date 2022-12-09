import {Company, IncomingUser} from './user';

class UserDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  company: Company;
  constructor(data: IncomingUser) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.company = data.company;
  }
}

export {UserDTO};
