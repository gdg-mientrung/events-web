import { Mentor } from "~/modals";

export interface MentorState {
  mentor: Mentor;
  isLoading: boolean;
}

const state = (): MentorState => ({
  mentor: new Mentor(),
  isLoading: false
});

export default state;
