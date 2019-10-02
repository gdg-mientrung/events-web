import { RootState } from "store";
import { GetterTree } from "vuex";
import { OrganizationState } from "./state";

const getters: GetterTree<OrganizationState, RootState> = {
  organizations: state => state.organizations,
  isLoading: state => state.isLoading
};
export default getters;
