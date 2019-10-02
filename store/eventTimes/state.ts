import { EventTime } from "~/modals";

export interface EventTimeState {
  eventTimes: EventTime[];
  isLoading: boolean;
}

const state = (): EventTimeState => ({
  eventTimes: [],
  isLoading: false
});

export default state;
