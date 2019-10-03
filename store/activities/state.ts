import { Activity } from "~/modals";

export interface ActivityState {
  activities: Activity[];
  isLoading: boolean;
}

const state = (): ActivityState => ({
  activities: [],
  isLoading: false
});

export default state;
