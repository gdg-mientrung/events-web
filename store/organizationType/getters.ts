import { RootState } from "store";
import { GetterTree } from "vuex";
import { OrganizationTypeState } from "./state";

const getters: GetterTree<OrganizationTypeState, RootState> = {
  organizationType: state => state.organizationType,
  isLoading: state => state.isLoading,
  isUpdating: state => state.isUpdating,
  isCreating: state => state.isCreating
};
export default getters;
