export interface IuserLogin {
  status:string;
  message:string;
  data:IUserData;
}

export interface IUserData {
  id:number;
  email:string;
  phone:string;
  token:string;

}
