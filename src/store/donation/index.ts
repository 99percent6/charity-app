import { Module } from 'vuex'
import { DonationController } from '@/controllers'
import { CreatingDonationPayload, Donation } from '@/interfaces/donation'
import { RootState } from '../interface'
import { DontationState } from './interface'

export const donationModule: Module<DontationState, RootState> = {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  actions: {
    async loadList({ commit }) {
      try {
        const donations = await DonationController.list()
        commit('loadList', donations)
        return donations
      } catch (error) {
        console.error(error)
        return []
      }
    },
    async create({ commit }, payload: CreatingDonationPayload) {
      const donation = await DonationController.create(payload)
      commit('create', donation)
      return donation
    },
  },
  mutations: {
    loadList(state, list: Donation[]) {
      state.list = list
    },
    create(state, donation: Donation) {
      state.list.push(donation)
    },
  },
}
