import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {execute, read} = deployments;

  const {assetAdmin, assetBouncerAdmin} = await getNamedAccounts();

  let currentAdmin;
  try {
    currentAdmin = await read('Asset', 'getAdmin');
  } catch (e) {
    // no admin
  }
  if (currentAdmin) {
    if (currentAdmin.toLowerCase() !== assetAdmin.toLowerCase()) {
      await execute(
        'Asset',
        {from: currentAdmin, log: true},
        'changeAdmin',
        assetAdmin
      );
    }
  }

  let currentBouncerAdmin;
  try {
    currentBouncerAdmin = await read('Asset', 'getBouncerAdmin');
  } catch (e) {
    // no admin
  }
  if (currentBouncerAdmin) {
    if (currentBouncerAdmin.toLowerCase() !== assetBouncerAdmin.toLowerCase()) {
      await execute(
        'Asset',
        {from: currentAdmin, log: true},
        'changeBouncerAdmin',
        assetBouncerAdmin
      );
    }
  }
};
export default func;
func.runAtTheEnd = true;
func.tags = ['Asset', 'Asset_setup'];
func.dependencies = ['Asset_deploy'];
