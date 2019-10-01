import { Mentor } from "~/modals";

export interface MentorState {
  mentor: Mentor;
  isLoading: boolean;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const state = (): MentorState => ({
  mentor: new Mentor(),
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false
});

export default state;
