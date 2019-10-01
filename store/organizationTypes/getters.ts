import { RootState } from "store";
import { GetterTree } from "vuex";
import { OrganizationTypeState } from "./state";

const getters: GetterTree<OrganizationTypeState, RootState> = {
  organizationTypes: state => state.organizationTypes,
  isLoading: state => state.isLoading
};
export default getters;
