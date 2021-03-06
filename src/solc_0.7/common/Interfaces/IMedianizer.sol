//SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

/**
 * @title Medianizer contract
 * @dev From MakerDAO (https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B#code)
 */
interface IMedianizer {
    function read() external view returns (bytes32);
}
