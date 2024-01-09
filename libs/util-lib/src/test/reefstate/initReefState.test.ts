import { initReefState } from "../../lib/reefState/initReefState";
import { describe, it, expect, beforeAll } from "vitest";
import { getSigner } from "../testUtils/signer";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { AVAILABLE_NETWORKS, initProvider } from "../../lib/network";
import { KeyringPair } from "@reef-defi/keyring/types";
import { getKeyring } from "../testUtils/keyring";
import { mnemonic1 as mnemonic } from "../testUtils/mnemonics";
import { TEST_ACCOUNTS } from "../testUtils/test-accounts";
import { selectedAccount_status$ } from "../../lib/reefState/account/selectedAccount";
import { firstValueFrom, race, skipWhile } from "rxjs";
import { selectedNFTs_status$ } from "../../lib/reefState/tokenState.rx";
import { accountsWithUpdatedIndexedData$ } from "../../lib/reefState/account/accountsIndexedData";
import {
  FeedbackStatusCode,
  StatusDataObject,
} from "../../lib/reefState/model/statusDataObject";

describe("initReefState", () => {
  let provider: Provider;
  let keyringPair: KeyringPair;
  let signer: Signer;

  beforeAll(async () => {
    provider = await initProvider("wss://rpc-testnet.reefscan.com/ws");
    await provider.api.isReadyOrError;
    keyringPair = await getKeyring(mnemonic);
    signer = getSigner(provider, keyringPair.address, mnemonic);
    initReefState({
      network: AVAILABLE_NETWORKS.testnet,
      jsonAccounts: { accounts: TEST_ACCOUNTS, injectedSigner: signer as any },
    });
  });
  it("should fetch first selected account", async () => {
    const res = await firstValueFrom(selectedAccount_status$.pipe());
    expect(res?.data).toEqual({
      address: "5GKKbUJx6DQ4rbTWavaNttanWAw86KrQeojgMNovy8m2QoXn",
      source: "reef",
    });
  });
  it("should test nfts", async () => {
    let nfts = await firstValueFrom(selectedNFTs_status$);
    nfts = await firstValueFrom(
      selectedNFTs_status$.pipe(
        skipWhile(nfts => nfts.hasStatus(FeedbackStatusCode.LOADING))
      )
    );
    if (nfts.data.length) {
      console.log(
        nfts.hasStatus(FeedbackStatusCode.PARTIAL_DATA_LOADING),
        "Nft data should not be complete yet."
      );
    }
    nfts = await firstValueFrom(
      selectedNFTs_status$.pipe(
        skipWhile((nfts: StatusDataObject<any>) => {
          return !(
            nfts.hasStatus(FeedbackStatusCode.COMPLETE_DATA) &&
            nfts.getStatusList().length === 1
          );
        })
      )
    );
    // console.log(!nfts.data.find(nft => !nft.hasStatus(FeedbackStatusCode.COMPLETE_DATA)), 'Nft data not complete')
    expect(nfts.toJson().toString()).toEqual(
      `{"data":[],"status":[{"code":6}]}`
    );
  });
});
