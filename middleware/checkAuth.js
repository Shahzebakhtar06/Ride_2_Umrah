const authRouteNames = ["admin-dashboard", "admin-location", "admin-hotels"];
export default function ({ route, store, redirect }) {
  debugger;
  if (authRouteNames.includes(route.name)) {
    if (!store.state.auth.loggedIn) {
      return redirect('/auth/login');
    }
  }
  else{
    return true
  }
}
