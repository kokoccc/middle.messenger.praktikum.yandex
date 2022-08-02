export interface ISignIn {
  data: TSubmitData
  button: TButton
}

export interface ISignUp {
  data: TSubmitData
  button: TButton
}

export interface ILogout {
  button: TButton
}

export interface IUserData {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar: string | null
}
