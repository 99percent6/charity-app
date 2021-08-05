<template>
  <div>
    <it-button
      id="edit-org-button"
      type="primary"
      size="big"
      icon="edit"
      @click="openModal"
    >
      Edit
    </it-button>
    <Modal :isOpenModal="isOpenModal" :closeModal="closeModal">
      <template #image>
        <img
          src="https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
      </template>
      <template #header>
        <h3>Edit Organization</h3>
      </template>
      <template #body>
        <it-input
          id="edit-org-input"
          v-model="organizationName"
          placeholder="Organization name"
        />
      </template>
      <template #actions>
        <it-button
          id="edit-org-button-modal"
          type="primary"
          size="big"
          icon="add_circle"
          class="col-xs-4"
          @click="editOrganization"
        >
          Edit
        </it-button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { PropType, watchEffect, defineComponent } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import { useModal, useOrganization } from '@/composable'
import { Organization } from '@/interfaces/organization'

export default defineComponent({
  props: {
    organization: {
      type: Object as PropType<Organization>,
      required: true,
      validator: (value: Organization) => (Boolean(value.id) && Boolean(value.name)),
    },
  },
  components: {
    Modal,
  },
  setup(props) {
    const { organizationName, editOrganization: edit } = useOrganization()
    const { isOpenModal, openModal, closeModal } = useModal()
    watchEffect(() => {
      organizationName.value = props.organization.name || ''
    })
    const editOrganization = async () => {
      await edit({ id: props.organization.id, name: organizationName.value })
      closeModal()
    }

    return {
      organizationName,
      isOpenModal,
      openModal,
      closeModal,
      editOrganization,
    }
  },
})
</script>
