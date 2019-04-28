// var Oyla = artifacts.require("./Oyla.sol");
var Sample = artifacts.require("./Sample.sol");

module.exports = function(deployer) {
  deployer.deploy(Sample);
  // deployer.deploy(Oyla);

  // Additional contracts can be deployed here
  // e.g. deployer.deploy(Contract, input_1, input...);
};