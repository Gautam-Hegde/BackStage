
### Description
Functionally it is the same as Basic-auth, routes are the same as well.
But now auth is using Json Web Tokens(JWT) for the same.

### JWT methods
payload=serversecret
token(random string)=jwt.sign(orginialstring, serversecret, [options, callback]); 

jwt.verify(token, serversecret, (err, decoded) => {
  log(decoded);
});

let ans=jwt.sign({
  username: 'zoro',
  password: '1234'
}, 'secret', {expiresIn: '1h'});

jwt.verify(ans,secret, (err, decoded) => {
  log(decoded);
});
 
