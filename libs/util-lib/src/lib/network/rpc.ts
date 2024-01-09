import { Signer } from "@reef-defi/evm-provider";
import { BigNumber, Contract, Signer as EthersSigner } from "ethers";
import { ERC20 } from "../token/abi/ERC20";
import { ReefSigner } from "../account/accountModel";
import { Token } from "../token/tokenModel";
import { ReefswapRouter } from "../token/abi/ReefswapRouter";
import { ReefswapFactory } from "../token/abi/ReefswapFactory";
import { createEmptyToken } from "../token/tokenUtil";

export const checkIfERC20ContractExist = async (
  address: string,
  signer: Signer
): Promise<{ name: string; symbol: string; decimals: number } | undefined> => {
  try {
    const contract = new Contract(
      address,
      ERC20,
      signer as unknown as EthersSigner
    );
    // TODO add additional checkers to be certain of Contract existence
    // @ts-ignore
    const name = await contract.name();
    // @ts-ignore
    const symbol = await contract.symbol();
    // @ts-ignore
    const decimals = await contract.decimals();
    return { name, symbol, decimals };
  } catch (error) {
    throw new Error("Unknown address");
  }
};

export const getREEF20Contract = async (
  address: string,
  signer: Signer
): Promise<{
  contract: Contract;
  values: { name: string; symbol: string; decimals: number };
} | null> => {
  try {
    const values = await checkIfERC20ContractExist(address, signer);
    if (values) {
      return {
        contract: new Contract(
          address,
          ERC20,
          signer as unknown as EthersSigner
        ),
        values,
      };
    }
  } catch (err) {}
  return null;
};

export const contractToToken = async (
  tokenContract: Contract,
  signer: ReefSigner
): Promise<Token> => {
  const contractToken = createEmptyToken();
  contractToken.address = tokenContract.address;
  // @ts-ignore
  contractToken.name = await tokenContract.name();
  // @ts-ignore
  contractToken.symbol = await tokenContract.symbol();
  // @ts-ignore
  contractToken.balance = await tokenContract.balanceOf(signer.evmAddress);// @ts-ignore
  contractToken.decimals = await tokenContract.decimals();
  return contractToken;
};

export const balanceOf = async (
  address: string,
  balanceAddress: string,
  signer: Signer
): Promise<BigNumber | null> => {
  const contract = (await getREEF20Contract(address, signer))?.contract;
  // @ts-ignore
  return contract ? contract.balanceOf(balanceAddress) : null;
};

export const getReefswapRouter = (address: string, signer: Signer): Contract =>
  new Contract(address, ReefswapRouter, signer as unknown as EthersSigner);
export const getReefswapFactory = (address: string, signer: Signer): Contract =>
  new Contract(address, ReefswapFactory, signer as unknown as EthersSigner);
