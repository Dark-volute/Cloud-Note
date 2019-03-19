function getcookiesInServer(req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}

export default function ({ app,store, redirect,req }) {
  if(store) {
    store.state.user ?  null : redirect('/login')
  }
  }