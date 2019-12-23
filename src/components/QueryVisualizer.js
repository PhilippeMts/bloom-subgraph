import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ForceGraph2D from "react-force-graph-2d";
import bigInt from "big-integer";

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
  if (loading) return "loading";
  if (error) return `error: ${error}`;
  const { identities, attestations } = data;
  const nodes = [];
  const links = [];
  for (const identity of identities) {
    const { id, bltBalance, attesterOf } = identity;
    let color, val;
    const isAttester = 0 < attesterOf.length;
    if (isAttester) {
      val = attesterOf.length;
      color = "#00f000";
    } else {
      val = bigInt(bltBalance)
        .divide(bigInt(10).pow(bigInt(18)))
        .valueOf();
      color = "#0000f0";
    }
    val = Math.min(20, Math.max(1, val));
    nodes.push({
      id,
      val,
      color
    });
  }
  for (const attestation of attestations) {
    links.push({
      source: attestation.attesterIdentity.id,
      target: attestation.subjectIdentity.id
    });
  }
  const graphData = { nodes, links };
  return <ForceGraph2D graphData={graphData} />;
};

export default QueryVisualizer;
