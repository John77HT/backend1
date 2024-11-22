//const Appmanager= require('../src/components/appManager.js');


const AppManager = require('./src/components/appManager.js');

const run = async () => {
  const oAppManager = new AppManager();  
  await oAppManager.prepareService();
  await oAppManager.runService();
}

run();
