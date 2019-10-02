import { Organization } from "~/modals";

export interface OrganizationState {
  organizations: Organization[];
  isLoading: boolean;
}

const state = (): OrganizationState => ({
  organizations: [],
  isLoading: false
});

export default state;
