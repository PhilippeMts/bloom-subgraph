import {Attestation, Attester, User} from "../generated/schema";
import {AttestationLogic, TraitAttested} from "../generated/Attestation/AttestationLogic";

export function handleTraitAttested(event: TraitAttested): void {
  // get parameters from event
  let subjectAddressString = event.params.subject.toHexString();
  let attesterAddressString = event.params.attester.toHexString();
  let requester = event.params.requester;
  let dataHash = event.params.dataHash;
  let attestationID = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // read the contract for additional state variables
  let attestationLogic = AttestationLogic.bind(event.address);
  let initializing = attestationLogic.initializing();

  // create User object if needed
  let subject = User.load(subjectAddressString);
  if (subject == null) {
    subject = new User(subjectAddressString);
    subject.save();
  }

  // create Attester object if needed
  let attester = Attester.load(attesterAddressString);
  if (attester == null) {
    attester = new Attester(attesterAddressString);
    attester.save();
  }

  // create Attestation object
  let attestation = new Attestation(attestationID);
  attestation.subject = subjectAddressString;
  attestation.attester = attesterAddressString;
  attestation.requester = requester;
  attestation.dataHash = dataHash;
  attestation.createdDuringMigration = initializing;
  attestation.save();
}
