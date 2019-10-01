import { OrganizationType } from "~/modals";

export interface OrganizationTypeState {
  organizationType: OrganizationType;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): OrganizationTypeState => ({
  organizationType: new OrganizationType(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
