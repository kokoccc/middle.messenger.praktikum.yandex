export interface IChangeAvatar {
  file: File
  component: TBlock
}

export interface IChangePassword {
  data: TFormData
  button: TButton
  fields: TTextField[]
}

export interface IChangeProfile {
  data: TFormData
  button: TButton
}
