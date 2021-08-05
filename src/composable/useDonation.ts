import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { RootState } from '@/store/interface'
import { CreatingDonationPayload } from '@/interfaces/donation'

export function useDonation() {
  const store = useStore<RootState>()
  const amount = ref(50)

  const loadDonations = async () => store.dispatch('donation/loadList')

  const createDonation = async (payload: CreatingDonationPayload) => {
    await store.dispatch('donation/create', payload)
  }

  return {
    donations: computed(() => store.state.donation.list),
    amount,
    loadDonations,
    createDonation,
  }
}
