import { RootState } from "store";
import { GetterTree } from "vuex";
import { OrganizationState } from "./state";

const getters: GetterTree<OrganizationState, RootState> = {
  organization: state => state.organization,
  isLoading: state => state.isLoading,
  isUpdating: state => state.isUpdating,
  isCreating: state => state.isCreating
};
export default getters;
