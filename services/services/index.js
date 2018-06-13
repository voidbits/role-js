require('module-alias/register');
const http = require('http'),
      ManagerAPI = require('@ManagerAPI'),
      ManagerServer = http.Server(ManagerAPI),
      ManagerPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

ManagerServer.listen(ManagerPORT, LOCAL, () => console.log(`ManagerAPI running on ${ManagerPORT}`));