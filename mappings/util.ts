import { Attestation, BloomAddress, Identity } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

class IdentityAndAddressResponse {
  identity: Identity;
  address: BloomAddress;
}

function getOrCreateIdentityAndAddress(
  addressString: string,
  randomID: string
): IdentityAndAddressResponse {
  let ZERO = BigInt.fromI32(0);
  let identity: Identity | null;
  let address = BloomAddress.load(addressString);
  if (address == null) {
    identity = new Identity(randomID);
    identity.disabled = false;
    identity.bltBalance = ZERO;
    identity.save();
    address = new BloomAddress(addressString);
    address.identity = randomID;
    address.bltBalance = ZERO;
    address.save();
  } else {
    identity = Identity.load(address.identity);
  }
  return { identity: identity as Identity, address: address as BloomAddress };
}

function transferAttestations(
  fromIdentity: Identity,
  toIdentity: Identity
): void {
  let subjectOfAttestations = fromIdentity.subjectOf;
  for (let i = 0; i < subjectOfAttestations.length; i++) {
    let attestation = Attestation.load(subjectOfAttestations[i]);
    if (attestation == null) continue;
    attestation.subjectIdentity = toIdentity.id;
    attestation.save();
  }
  let attesterOfAttestations = fromIdentity.attesterOf;
  for (let i = 0; i < attesterOfAttestations.length; i++) {
    let attestation = Attestation.load(attesterOfAttestations[i]);
    if (attestation == null) continue;
    attestation.attesterIdentity = toIdentity.id;
    attestation.save();
  }
}

export { getOrCreateIdentityAndAddress, transferAttestations };
