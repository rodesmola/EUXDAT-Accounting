var domain = 'test.euxdat.eu';
var euxdatURL = 'https://accounting.'.concat(domain,'/api/');

var keyCloakConf = {
  authRealm: "euxdat",
  authUrl: "https://".concat(domain, "/auth"),
  authClientId: "frontend",
  logoutRedirectUri: "https://".concat(domain),
};

const CONST = {
  keyCloakConf: keyCloakConf,
  euxdatURL: euxdatURL  
};

export default CONST