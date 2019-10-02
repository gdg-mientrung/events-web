import { EventDate } from "~/modals";

export interface EventDateState {
  eventDate: EventDate;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): EventDateState => ({
  eventDate: new EventDate(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
