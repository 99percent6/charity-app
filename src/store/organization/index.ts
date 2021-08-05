import { Module } from 'vuex'
import { OrganizationController } from '@/controllers'
import { CreatingOrganizationPayload, EditingOrganizationPayload, Organization } from '@/interfaces/organization'
import { RootState } from '../interface'
import { OrganizationState } from './interface'

export const organizationModule: Module<OrganizationState, RootState> = {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  actions: {
    async loadList({ commit }) {
      try {
        const organizations = await OrganizationController.list()
        commit('loadList', organizations)
        return organizations
      } catch (error) {
        console.error(error)
        return []
      }
    },
    async create({ commit }, payload: CreatingOrganizationPayload) {
      const organization = await OrganizationController.create(payload)
      commit('create', organization)
      return organization
    },
    async edit({ commit }, payload: EditingOrganizationPayload) {
      const organization = await OrganizationController.edit(payload)
      commit('edit', organization)
      return organization
    },
  },
  mutations: {
    loadList(state, list: Organization[]) {
      state.list = list
    },
    create(state, organization: Organization) {
      state.list.push(organization)
    },
    edit(state, organization: Organization) {
      const index = state.list.findIndex((org) => org.id === organization.id)
      const organizations = state.list
      organizations[index] = organization
      state.list = organizations
    },
  },
}
