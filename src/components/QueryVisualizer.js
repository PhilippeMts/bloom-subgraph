import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ForceGraph2D from "react-force-graph-2d";
import bigInt from "big-integer";
import Loader from "react-loader-spinner";

const QueryVisualizer = () => {
  const MAIN_QUERY = gql`
    {
      identities(where: { disabled: false }, first: 1000) {
        id
        bltBalance
        subjectOf {
          id
        }
        attesterOf {
          id
        }
        addresses {
          id
        }
      }
      attestations(first: 1000) {
        id
        subjectIdentity {
          id
        }
        attesterIdentity {
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(MAIN_QUERY);
  if (loading)
    return (
      <div className={"centeringWrapper"}>
        <Loader type="Grid" color="#0000a0" height={100} width={100} />
      </div>
    );
  if (error) return `error: ${error}`;
  const { identities, attestations } = data;
  const nodes = [];
  const links = [];
  for (const identity of identities) {
    const { id, bltBalance, subjectOf, attesterOf } = identity;
    let color, val, name;
    const isAttester = 0 < attesterOf.length;
    const balanceNumber = bigInt(bltBalance)
      .divide(bigInt(10).pow(bigInt(18)))
      .valueOf();
    if (isAttester) {
      val = attesterOf.length;
      color = "#00f000";
      name = `Role: attester`;
    } else {
      val = balanceNumber;
      color = "#0000f0";
      name = `Role: User`;
    }
    name += `, Addresses: [${identity.addresses.map(
      ({ id }) => `${id.substr(0, 6)}…${id.substr(38, 4)} `
    )}], \nBLT Balance: ${balanceNumber}, Nb Attestations: ${subjectOf.length +
      attesterOf.length}`;
    val = Math.min(20, Math.max(1, val));
    nodes.push({
      id,
      val,
      color,
      name
    });
  }
  for (const attestation of attestations) {
    links.push({
      source: attestation.attesterIdentity.id,
      target: attestation.subjectIdentity.id
    });
  }
  const graphData = { nodes, links };
  return (
    <ForceGraph2D
      graphData={graphData}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={0.64}
    />
  );
};

export default QueryVisualizer;
