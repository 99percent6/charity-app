<template>
  <ul class="row col-xs-12 center-xs">
    <li
      v-for="organization in organizations"
      :key="organization.id"
      class="row organization col-xs-12 between-xs middle-xs"
    >
      <div class="row col-xs-12 col-sm-8 center-xs start-sm">{{ organization.name }}</div>
      <div class="row col-xs-12 col-sm-4 around-xs">
        <EditOrganization :organization="organization" />
        <Donate :organization="organization" />
      </div>
      <div class="row col-xs-12">
        <strong>Donation amount - ${{ getOrganizationDonations(organization.id) }}</strong>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditOrganization from '@/components/organization/EditOrganization.vue'
import Donate from '@/components/organization/Donate.vue'
import { useDonation, useOrganization } from '@/composable'

export default defineComponent({
  components: {
    EditOrganization,
    Donate,
  },
  async setup() {
    const { organizations, loadOrganizations } = useOrganization()
    const { donations, loadDonations } = useDonation()
    await loadOrganizations()
    await loadDonations()

    const getOrganizationDonations = (organizationId: number) => (
      donations.value
        .reduce((acc, donation) => {
          if (donation.organizationId === organizationId) {
            return donation.amount + acc
          }
          return acc
        }, 0)
    )

    return {
      organizations,
      getOrganizationDonations,
    }
  },
})
</script>

<style scoped>
.organization {
  list-style: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px grey;
}
</style>
