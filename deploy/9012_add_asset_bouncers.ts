import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { execute, read } = deployments;

  const { assetBouncerAdmin } = await getNamedAccounts();
  const assetMinter = await deployments.get('AssetMinter');
  const isAssetAdmimBouncer = await read('Asset', 'isBouncer', assetMinter.address);

  if (!isAssetAdmimBouncer) {
    await execute(
      'Asset',
      { from: assetBouncerAdmin, log: true },
      'setBouncer',
      assetMinter.address,
      true
    );
  }
};
export default func;
func.runAtTheEnd = true;
func.tags = ['Asset', 'Asset_setup'];
func.dependencies = ['Asset_deploy'];
