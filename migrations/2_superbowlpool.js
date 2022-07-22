const SuperBowlPool = artifacts.require("SuperBowlPool.sol");

module.exports = function (deployer, ceoAddress, devAddress) {
    ceoAddress = "0x7DABD87DA1eD02D00d753C2d44854004Cf78b45D";
	devAddress = "0x3dA2AD4e9B40795564781132F3ED4AE6A2E13b4D";
    deployer.deploy(SuperBowlPool, ceoAddress, devAddress);
};
