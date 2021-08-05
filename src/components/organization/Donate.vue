<template>
  <div>
    <it-button
      id="donate-org-button"
      type="primary"
      size="big"
      icon="paid"
      @click="openModal"
    >
      Donate
    </it-button>
    <Modal :isOpenModal="isOpenModal" :closeModal="closeModal">
      <template #image>
        <img
          src="https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
      </template>
      <template #header>
        <h3>Donate to {{ organization.name }}</h3>
      </template>
      <template #body>
        <it-input
          id="donate-org-input"
          v-model.number="amount"
          placeholder="Donation amount"
          prefix-icon="attach_money"
        />
      </template>
      <template #actions>
        <it-button
          id="donate-org-button-modal"
          type="primary"
          size="big"
          icon="add_circle"
          class="col-xs-4"
          @click="createDonation"
        >
          Donate
        </it-button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useDonation, useModal } from '@/composable'
import { Organization } from '@/interfaces/organization'
import Modal from '@/components/ui/Modal.vue'

export default defineComponent({
  props: {
    organization: {
      type: Object as PropType<Organization>,
      required: true,
    },
  },
  components: {
    Modal,
  },
  setup(props) {
    const { createDonation: create, amount } = useDonation()
    const { isOpenModal, openModal, closeModal } = useModal()

    const createDonation = async () => {
      if (!amount.value) return
      await create({
        organizationId: props.organization.id,
        amount: amount.value,
      })
      closeModal()
    }

    return {
      amount,
      isOpenModal,
      createDonation,
      openModal,
      closeModal,
    }
  },
})
</script>
