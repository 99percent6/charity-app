export type Organization = {
  id: number
  name: string
}

export type CreatingOrganizationPayload = {
  name: string
}

export type EditingOrganizationPayload = {
  name: string
  id: number
}
