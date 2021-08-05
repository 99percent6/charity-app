import { DontationState } from './donation/interface'
import { OrganizationState } from './organization/interface'

export interface RootState {
  organization: OrganizationState
  donation: DontationState
}
