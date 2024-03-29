// @ts-nocheck
/* eslint-disable prefer-promise-reject-errors */
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike, Bytes } from '@ethersproject/bytes';
import { SubmittableResult, ApiPromise } from '@polkadot/api';
import {
  bufferToU8a,
  hexToBn,
  hexToString,
  hexToU8a,
  isBuffer,
  isHex,
  isU8a,
  u8aToBn,
  u8aToHex
} from '@polkadot/util';
import BN from 'bn.js';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { toUtf8Bytes } from '@ethersproject/strings';
import type { TransactionReceipt } from '@ethersproject/abstract-provider';
import { PopulatedTransaction } from 'ethers';
import { Provider } from './Provider';
import { Signer } from './Signer';

export const U32MAX = BigNumber.from('0xffffffff');
export const U64MAX = BigNumber.from('0xffffffffffffffff');
export const MAINNET_GENESIS_HASH =
  '0x7834781d38e4798d548e34ec947d19deea29df148a7bf32484b7b24dacf8d4b7';

export function createClaimEvmSignature(substrateAddress: string): Bytes {
  const publicKeySubstrate = decodeAddress(substrateAddress);
  let message: Bytes | string =
    'reef evm:' + Buffer.from(publicKeySubstrate).toString('hex');

  if (typeof message === 'string') {
    message = toUtf8Bytes(message);
  }

  return message;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function decodeMessage(reason: any, code: string): string {
  const reasonString = JSON.stringify(reason).toLowerCase();
  let codeString = `0x${code.substr(138)}`.replace(/0+$/, '');

  // If the codeString is an odd number of characters, add a trailing 0
  if (codeString.length % 2 === 1) {
    codeString += '0';
  }

  return `${reasonString} ${hexToString(codeString)}`;
}

export function handleTxResponse(
  result: SubmittableResult,
  api: ApiPromise
): Promise<{
  result: SubmittableResult;
  message?: string;
}> {
  return new Promise((resolve, reject) => {
    if (result.status.isFinalized || result.status.isInBlock) {
      const createdFailed = result.findRecord('evm', 'CreatedFailed');
      const executedFailed = result.findRecord('evm', 'ExecutedFailed');

      result.events
        .filter(({ event: { section } }): boolean => section === 'system')
        .forEach((event): void => {
          const {
            event: { data, method }
          } = event;

          if (method === 'ExtrinsicFailed') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const [dispatchError] = data as any[];

            let message = dispatchError.type;

            if (dispatchError.isModule) {
              try {
                const mod = dispatchError.asModule;
                const error = api.registry.findMetaError(
                  new Uint8Array([mod.index.toNumber(), mod.error.toNumber()])
                );
                message = `${error.section}.${error.name}`;
              } catch (error) {
                // swallow
              }
            }

            reject({ message, result });
          } else if (method === 'ExtrinsicSuccess') {
            const failed = createdFailed || executedFailed;
            if (failed) {
              reject({
                message: decodeMessage(
                  failed.event.data[1].toJSON(),
                  failed.event.data[2].toJSON() as string
                ),
                result
              });
            }
            resolve({ result });
          }
        });
    } else if (result.isError) {
      reject({ result });
    }
  });
}

export function toBN(bigNumberis: BigNumberish = 0): BN {
  if (isU8a(bigNumberis)) {
    return u8aToBn(bigNumberis);
  }
  if (isHex(bigNumberis)) {
    return hexToBn(bigNumberis);
  }

  if (BigNumber.isBigNumber(bigNumberis)) {
    const hex = bigNumberis.toHexString();
    if (hex[0] === '-') {
      return new BN('-' + hex.substring(3), 16);
    }
    return new BN(hex.substring(2), 16);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new BN(bigNumberis as any);
}

export function dataToString(bytes: BytesLike): string {
  if (isBuffer(bytes)) {
    return u8aToHex(bufferToU8a(bytes));
  }
  if (isU8a(bytes)) {
    return u8aToHex(bytes);
  }
  if (Array.isArray(bytes)) {
    return u8aToHex(Buffer.from(bytes));
  }

  return bytes as string;
}

export function isSubstrateAddress(address: string): boolean {
  if (!address) {
    return false;
  }
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
  } catch (error) {
    return false;
  }
  return true;
}

export function isMainnet(providerOrSigner: Provider | Signer): boolean {
  const provider = (providerOrSigner as Signer).provider
    ? (providerOrSigner as Signer).provider
    : (providerOrSigner as Provider);
  return provider?.api?.genesisHash.toString() === MAINNET_GENESIS_HASH;
}

// returns evm address
export async function resolveEvmAddress(
  provider: Provider,
  nativeAddressOrName: string | Promise<string>
): Promise<string> {
  const resolved = await nativeAddressOrName;
  if (resolved.length === 42) {
    return resolved;
  }
  const result = await provider.api.query.evmAccounts.evmAddresses(resolved);
  return result.toString();
}

// returns Reef native address
export async function resolveAddress(
  provider: Provider,
  evmAddressOrName: string | Promise<string>
): Promise<string> {
  const resolved = await evmAddressOrName;
  if (isSubstrateAddress(resolved)) {
    return resolved;
  }
  const result = await provider.api.query.evmAccounts.accounts(resolved);
  return result.toString();
}

export async function buildPayload(
  provider: Provider,
  signerAddress: string,
  tx: PopulatedTransaction
): Promise<{ payload: any; extrinsic: any }> {
  try {
    const lastHeader = await provider.api.rpc.chain.getHeader();
    const blockNumber = provider.api.registry.createType(
      'BlockNumber',
      lastHeader.number.toNumber()
    );

    const signerEvmAddress = await provider.api.query.evmAccounts.evmAddresses(
      signerAddress
    );
    if (signerEvmAddress.isEmpty)
      throw new Error(`No EVM address found for signer ${signerAddress}`);
    tx.from = signerEvmAddress.toString();
    const resources = await provider.estimateResources(tx);
    const gasLimit = resources.gas.mul(31).div(10); // Multiply by 3.1
    const storageLimit = resources.storage.mul(31).div(10); // Multiply by 3.1

    const extrinsic = provider.api.tx.evm.call(
      tx.to,
      tx.data,
      toBN(tx.value),
      toBN(gasLimit),
      toBN(storageLimit.isNegative() ? 0 : storageLimit)
    );
    const method = provider.api.createType('Call', extrinsic);

    const era = provider.api.registry.createType('ExtrinsicEra', {
      current: lastHeader.number.toNumber(),
      period: 64
    });
    const nonce = await provider.api.rpc.system.accountNextIndex(signerAddress);
    const tip = provider.api.registry.createType('Compact<Balance>', 0).toHex();

    const payload = {
      specVersion: provider.api.runtimeVersion.specVersion.toString(),
      transactionVersion:
        provider.api.runtimeVersion.transactionVersion.toHex(),
      address: signerAddress,
      blockHash: lastHeader.hash.toHex(),
      blockNumber: blockNumber.toHex(),
      era: era.toHex(),
      genesisHash: provider.api.genesisHash.toHex(),
      method: method.toHex(),
      nonce: nonce.toHex(),
      signedExtensions: [
        'CheckSpecVersion',
        'CheckTxVersion',
        'CheckGenesis',
        'CheckMortality',
        'CheckNonce',
        'CheckWeight',
        'ChargeTransactionPayment',
        'SetEvmOrigin'
      ],
      tip: tip,
      version: extrinsic.version
    };

    return { payload, extrinsic };
  } catch (e) {
    console.log('Error building payload:', e);
    throw e;
  }
}

export async function sendSignedTransaction(
  provider: Provider,
  signerAddress: string,
  tx: PopulatedTransaction,
  payload: any,
  extrinsic: any,
  signature: string
): Promise<any> {
  extrinsic.addSignature(signerAddress, signature, payload);

  const txResult = await new Promise((resolve, reject) => {
    extrinsic
      .send((result: any) => {
        handleTxResponse(result, provider.api)
          .then(() => {
            resolve({
              hash: extrinsic.hash.toHex(),
              from: tx.from || '',
              confirmations: 0,
              nonce: (tx.nonce || 0).toString(),
              gasLimit: (tx.gasLimit || 0).toString(),
              gasPrice: '0',
              data: dataToString(tx.data!),
              value: (tx.value || 0).toString(),
              chainId: 13939,
              wait: (): Promise<TransactionReceipt> => {
                return provider._resolveTransactionReceipt(
                  extrinsic.hash.toHex(),
                  result.status.asInBlock.toHex(),
                  tx.from || ''
                );
              }
            });
          })
          .catch(({ message }) => {
            reject(message);
          });
      })
      .catch((error: any) => {
        reject(error && error.message);
      });
  });

  return txResult;
}
