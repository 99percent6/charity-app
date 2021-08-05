<template>
  <div class="container">
    <div class="row center-xs">
      <CreateOrganization />
      <Suspense>
        <template #default>
          <OrganizationList />
        </template>
        <template #fallback>
          <div class="col-xs-12 loaderWrapper">
            <it-loading />
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateOrganization from '@/components/organization/CreateOrganization.vue'
import OrganizationList from '@/components/organization/OrganizationList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    CreateOrganization,
    OrganizationList,
  },
})
</script>

<style scoped>
.loaderWrapper {
  margin: 20px 0;
}
</style>
