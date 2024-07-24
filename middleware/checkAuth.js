const authRouteNames = [
  "admin-amenities",
  "admin-rooms",
  "admin-addons",
  "admin-cities",
  "admin-packages",
  "admin-fares",
  "admin-visa",
  "admin-cars",
  "admin-hotels",
];
export default function ({ $auth, route, store, redirect }) {
  if (authRouteNames.includes(route.name)) {
    if (!$auth.loggedIn) {
      return redirect("/auth/login");
    }
  } else {
    return true;
  }
}
