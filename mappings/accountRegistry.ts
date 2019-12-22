import {
  AccountRegistryLogic,
  AddressLinked,
  AddressUnlinked
} from "../generated/Account/AccountRegistryLogic";
import {
  BloomAccount,
  BloomAddress,
  BloomAddressHistoryItem
} from "../generated/schema";

export function handleAddressLinked(event: AddressLinked): void {
  // get parameters from event
  let blockNumber = event.block.number;
  let accountID = event.params.linkId.toHex();

  // read the contract for additional state variables
  let accountRegistryLogic = AccountRegistryLogic.bind(event.address);
  let initializing = accountRegistryLogic.initializing();

  // get or create Account object
  let account = BloomAccount.load(accountID);
  if (account == null) {
    account = new BloomAccount(accountID);
    account.nbActiveAddresses = 0;
  }

  // handle Address objects
  for (let i = 0; i < 2; i++) {
    let addressString: string;
    addressString =
      i < 1
        ? event.params.currentAddress.toHexString()
        : event.params.newAddress.toHexString();
    // load Address object
    let address = BloomAddress.load(addressString);
    if (address == null) {
      // create Address object
      address = new BloomAddress(addressString);
      address.address = addressString;
    }

    if (address.account == null) {
      // create new BloomAddressHistoryItem object
      let addressHistoryItemID = createAddressHistoryItemID(
        addressString,
        event
      );
      let addressHistoryItem = new BloomAddressHistoryItem(
        addressHistoryItemID
      );
      addressHistoryItem.linkID = accountID;
      addressHistoryItem.address = addressString;
      addressHistoryItem.createdDuringMigration = initializing;
      addressHistoryItem.creationBlock = blockNumber;
      addressHistoryItem.save();
      // update active field in BloomAddress object
      address.account = accountID;
      // update nbActiveAddresses field in BloomAccount object
      account.nbActiveAddresses += 1;
    }
    address.save();
  }
  account.save();
}

export function handleAddressUnlinked(event: AddressUnlinked): void {
  // get parameters from event
  let blockNumber = event.block.number;
  let addressString = event.params.addressToRemove.toHexString();
  // load BloomAddress object
  let address = BloomAddress.load(addressString);
  if (address == null) return;
  let addressHistory = address.history;
  for (let i = 0; i < addressHistory.length; i++) {
    // load BloomAddressHistoryItem object
    let addressHistoryItem = BloomAddressHistoryItem.load(addressHistory[i]);
    if (addressHistoryItem.deletionBlock == null) continue;
    addressHistoryItem.deletionBlock = blockNumber;
    addressHistoryItem.save();
    // update BloomAddress object
    address.unset("account");
    address.save();
    // load BloomAccount object
    let account = BloomAccount.load(addressHistoryItem.linkID);
    if (account == null) return;
    // update BloomAccount object
    account.nbActiveAddresses -= 1;
    account.save();
  }
}

function createAddressHistoryItemID(
  addressString: string,
  event: AddressLinked
): string {
  return (
    addressString +
    "-" +
    event.transaction.hash.toHex() +
    "-" +
    event.logIndex.toString()
  );
}
