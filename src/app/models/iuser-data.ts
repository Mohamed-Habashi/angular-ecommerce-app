export interface IUserData {
  status: string
  Message: string
  data: IUserDataDetails[]
}

export interface IUserDataDetails {
  id: number
  name: string
  email: string
  phone: string
  userImage: string
  friend_key: any
  token: string
  fcm_token: string
}
