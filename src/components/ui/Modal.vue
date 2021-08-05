<template>
  <teleport to="#modal">
    <it-modal v-model="isVisibleModal">
      <template #image>
        <slot name="image"></slot>
      </template>

      <template #header>
        <div class="row between-xs middle-xs">
          <slot name="header"></slot>
          <it-icon
            name="close"
            outlined
            @click="closeModal"
            class="icon-close"
          />
        </div>
      </template>

      <template #body>
        <slot name="body"></slot>
      </template>
      <template #actions>
        <slot name="actions"></slot>
      </template>
    </it-modal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    isOpenModal: Boolean,
    closeModal: Function,
  },
  setup(props) {
    const isVisibleModal = ref(false)
    watchEffect(() => {
      isVisibleModal.value = props.isOpenModal
    })

    return {
      isVisibleModal,
    }
  },
})
</script>

<style scoped>
.icon-close {
  font-size: 30px;
  cursor: pointer;
}
</style>
