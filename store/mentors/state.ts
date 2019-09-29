import { Mentor } from "~/modals";

export interface MentorState {
  mentors: Mentor[];
  isLoading: boolean;
}

const state = (): MentorState => ({
  mentors: [],
  isLoading: false
});

export default state;
