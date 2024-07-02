const authRouteNames = ["admin-amenities","admin-cars", "admin-location", "admin-hotels"];
export default function ({ $auth,route, store, redirect }) {
  if (authRouteNames.includes(route.name)) {
    if (!$auth.loggedIn) {
      return redirect('/auth/login');
    }
    
  }
 
  else{
    return true
  }
}
