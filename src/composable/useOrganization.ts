import { computed, ref } from 'vue'
import { RootState } from '@/store/interface'
import { CreatingOrganizationPayload, EditingOrganizationPayload } from '@/interfaces/organization'
import { useStore } from 'vuex'

export function useOrganization() {
  const store = useStore<RootState>()
  const organizationName = ref('')

  const loadOrganizations = async () => store.dispatch('organization/loadList')
  const createOrganization = async (payload: CreatingOrganizationPayload) => {
    await store.dispatch('organization/create', payload)
  }
  const editOrganization = async (payload: EditingOrganizationPayload) => {
    await store.dispatch('organization/edit', payload)
  }

  return {
    organizations: computed(() => store.state.organization.list),
    organizationName,
    loadOrganizations,
    createOrganization,
    editOrganization,
  }
}
