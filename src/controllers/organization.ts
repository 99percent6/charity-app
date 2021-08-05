import { CreatingOrganizationPayload, EditingOrganizationPayload, Organization } from '@/interfaces/organization'
import { Utils } from '@/lib/utils'
import { Storage } from './storage'

export class OrganizationController {
  private static readonly cacheKey = 'organizations'

  private static saveOrganization(organization: Organization) {
    const organizations = Storage.getItem<Organization[]>(this.cacheKey) || []
    const hasOrg = organizations.some((org) => org.id === organization.id)
    if (hasOrg) {
      organizations.forEach((org) => {
        if (org.id === organization.id) {
          Object.assign(org, { name: organization.name })
        }
      })
    } else {
      organizations.push(organization)
    }
    Storage.setItem(this.cacheKey, organizations)
  }

  public static async create(payload: CreatingOrganizationPayload) {
    const org = {
      name: payload.name,
      id: Utils.generateId(),
    }
    this.saveOrganization(org)
    await Utils.sleep()
    return org
  }

  public static async edit(organization: EditingOrganizationPayload) {
    this.saveOrganization(organization)
    await Utils.sleep(300)
    return organization
  }

  public static async list() {
    const organizations = Storage.getItem<Organization[]>(this.cacheKey) || []
    await Utils.sleep()
    return organizations
  }
}
