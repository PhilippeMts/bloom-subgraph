import {AddressLinked, AddressUnlinked} from "../generated/Account/AccountRegistryLogic";
import {Identity} from "../generated/schema";
import {getOrCreateIdentityAndAddress, transferAttestations} from "./util";
import {BigInt} from "@graphprotocol/graph-ts/index";

export function handleAddressLinked(event: AddressLinked): void {
  // get parameters from event
  let currentAddressString = event.params.currentAddress.toHexString();
  let newAddressString = event.params.newAddress.toHexString();
  let randomID =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // get or create Identity and Address objects for currentAddress
  let data = getOrCreateIdentityAndAddress(currentAddressString, randomID + "-0");
  let currentIdentity = data.identity;

  // get or create Identity and Address objects for newAddress
  data = getOrCreateIdentityAndAddress(newAddressString, randomID + "-1");
  let newIdentity = data.identity;
  let newAddress = data.address;

  // transfer all attestations from newAddress and update balance
  transferAttestations(newIdentity, currentIdentity);
  currentIdentity.bltBalance = currentIdentity.bltBalance.plus(newIdentity.bltBalance);
  currentIdentity.save();

  // disable old identity for newAddress
  newIdentity.disabled = true;
  newIdentity.unset("bltBalance");
  newIdentity.save();

  // update newAddress identity field
  newAddress.identity = currentIdentity.id;
  newAddress.save();
}

export function handleAddressUnlinked(event: AddressUnlinked): void {
  // get parameters from event
  let addressString = event.params.addressToRemove.toHexString();
  let randomID =
      event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // load BloomAddress object
  let data = getOrCreateIdentityAndAddress(addressString, randomID);
  let oldIdentity = data.identity;
  let address = data.address;

  // create new Identity object
  let newIdentity = new Identity(randomID);
  newIdentity.bltBalance = BigInt.fromI32(0);
  newIdentity.disabled = false;
  newIdentity.save();

  // transfer all attestations from newAddress and update balance
  transferAttestations(oldIdentity, newIdentity);
  newIdentity.bltBalance = newIdentity.bltBalance.plus(address.bltBalance);
  newIdentity.save();
  oldIdentity.bltBalance = oldIdentity.bltBalance.minus(address.bltBalance);
  oldIdentity.save();
}
