<template>
  <div>
    <it-button
      id="create-org-button"
      type="primary"
      size="big"
      icon="add_circle"
      @click="openModal"
    >
      Create organizaiton
    </it-button>
    <Modal :isOpenModal="isOpenModal" :closeModal="closeModal">
      <template #image>
        <img
          src="https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
      </template>
      <template #header>
        <h3>Create Organization</h3>
      </template>
      <template #body>
        <it-input
          id="create-org-input"
          v-model="organizationName"
          placeholder="Organization name"
        />
      </template>
      <template #actions>
        <it-button
          id="create-org-button-modal"
          type="primary"
          size="big"
          icon="add_circle"
          class="col-xs-4"
          @click="createOrganization"
        >
          Create
        </it-button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import { useModal, useOrganization } from '@/composable'

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const { organizationName, createOrganization: create } = useOrganization()
    const { isOpenModal, openModal, closeModal } = useModal()

    const createOrganization = async () => {
      await create({ name: organizationName.value })
      closeModal()
    }

    return {
      organizationName,
      isOpenModal,
      openModal,
      closeModal,
      createOrganization,
    }
  },
})
</script>
