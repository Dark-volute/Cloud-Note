export default function ({ app,store, redirect,route } ) {
  const permissionPath = ['/login','/sign','/retrievePassword']
  const path = route.path
  if(store) {
    (store.state.user || permissionPath.includes(path)) ?  null : redirect('/login')
  }

  if(path === '/') redirect('/login')
  }