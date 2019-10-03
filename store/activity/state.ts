import { Activity } from "~/modals";

export interface ActivityState {
  activity: Activity;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): ActivityState => ({
  activity: new Activity(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
