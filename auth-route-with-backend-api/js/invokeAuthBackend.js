function invokeAuthBackend(r) {
  const data = require('querystring').decode(r.requestText)
  const body = { username: data.username, password: data.password }

  r.subrequest("/_authenticate", { body: JSON.stringify(body) }, (reply) => {
    if(reply.status == 200) {
      r.return(302, data.redirect_uri)
    } else {
      r.error("Authenticate service provided a non-200 response")
      //r.error(JSON.stringify(reply))
      r.return(302, `/login?failed=1&redirect_uri=${data.redirect_uri}`)
    }
  })
}

export default invokeAuthBackend;