import { CreatingDonationPayload, Donation } from '@/interfaces/donation'
import { Utils } from '@/lib/utils'
import { Storage } from './storage'

export class DonationController {
  private static readonly cacheKey = 'donations'

  public static async create(payload: CreatingDonationPayload) {
    const donation: Donation = {
      ...payload,
      id: Utils.generateId(),
    }
    const donations = Storage.getItem<Donation[]>(this.cacheKey) || []
    donations.push(donation)
    Storage.setItem(this.cacheKey, donations)
    await Utils.sleep()
    return donation
  }

  public static async list() {
    const donations = Storage.getItem<Donation[]>(this.cacheKey) || []
    return donations
  }
}
