import { EventTime } from "~/modals";

export interface EventTimeState {
  eventTime: EventTime;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): EventTimeState => ({
  eventTime: new EventTime(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
