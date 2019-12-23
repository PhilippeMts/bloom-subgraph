import {Attestation} from "../generated/schema";
import {AttestationLogic, TraitAttested} from "../generated/Attestation/AttestationLogic";
import {getOrCreateIdentityAndAddress} from "./util";

export function handleTraitAttested(event: TraitAttested): void {
  // get parameters from event
  let subjectAddressString = event.params.subject.toHexString();
  let attesterAddressString = event.params.attester.toHexString();
  let requester = event.params.requester;
  let dataHash = event.params.dataHash;
  let randomID =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // read the contract for additional state variables
  let attestationLogic = AttestationLogic.bind(event.address);
  let initializing = attestationLogic.initializing();

  // get or create subject Identity and Address objects
  let data = getOrCreateIdentityAndAddress(subjectAddressString, randomID+"-0");
  let subjectIdentity = data.identity;
  let subjectAddress = data.address;

  // get or create attester Identity and Address objects
  data = getOrCreateIdentityAndAddress(attesterAddressString, randomID+"-1");
  let attesterIdentity = data.identity;
  let attesterAddress = data.address;

  // create Attestation object
  let attestation = new Attestation(randomID);
  attestation.subjectAddress = subjectAddress.id;
  attestation.subjectIdentity = subjectIdentity.id;
  attestation.attesterAddress = attesterAddress.id;
  attestation.attesterIdentity = attesterIdentity.id;
  attestation.requester = requester;
  attestation.dataHash = dataHash;
  attestation.createdDuringMigration = initializing;
  attestation.save();
}
