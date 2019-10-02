import { Organization } from "~/modals";

export interface OrganizationState {
  organization: Organization;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): OrganizationState => ({
  organization: new Organization(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
