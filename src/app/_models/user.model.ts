export class UserAuthModel {
  email_address: String;
  password: String;
  phoneNumber: number;
}


export interface User {
   uid: string;
   email: string;
   emailVerified: boolean;
   phoneNumber:number;
}
