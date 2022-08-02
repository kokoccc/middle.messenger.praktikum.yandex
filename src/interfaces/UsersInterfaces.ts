export interface IChangeAvatar {
  file: File
  component: TBlock
}

export interface IChangePassword {
  data: TSubmitData
  button: TButton
  fields: TTextField[]
}

export interface IChangeProfile {
  data: TSubmitData
  button: TButton
}
