import { OrganizationType } from "~/modals";

export interface OrganizationTypeState {
  organizationTypes: OrganizationType[];
  isLoading: boolean;
}

const state = (): OrganizationTypeState => ({
  organizationTypes: [],
  isLoading: false
});

export default state;
