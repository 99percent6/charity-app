import { createStore } from 'vuex'
import { RootState } from './interface'
import { organizationModule } from './organization'
import { donationModule } from './donation'

export const store = createStore<RootState>({
  modules: {
    organization: organizationModule,
    donation: donationModule,
  },
})
