module.exports = {
  devMode: parseInt(process.env.NODE_FEEDTHEDEVS_DEVMODE, 10) && true || false,
  dbConnectParams: process.env.NODE_FEEDTHEDEVS_DBCONNECTPARAMS,
  clientId: process.env.NODE_FEEDTHEDEVS_CLIENTID,
  clientSecret: process.env.NODE_FEEDTHEDEVS_CLIENTSECRET
};
