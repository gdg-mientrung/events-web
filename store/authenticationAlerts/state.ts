export interface AuthenticationAlertsState {
  errorAlert: string;
}

const state = (): AuthenticationAlertsState => ({
  errorAlert: ""
});

export default state;
