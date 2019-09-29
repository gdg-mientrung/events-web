export default function({ store, redirect, route }) {
  store.state.userInfo.userInfo != null && route.name == "login"
    ? redirect("/")
    : "";
  store.state.userInfo.userInfo == null && isAdminRoute(route)
    ? redirect("/login")
    : "";
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == "/login")) {
    return false;
  }
  return true;
}
