import { EventDate } from "~/modals";

export interface EventDateState {
  eventDates: EventDate[];
  isLoading: boolean;
}

const state = (): EventDateState => ({
  eventDates: [],
  isLoading: false
});

export default state;
