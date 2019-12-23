import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import bigInt from "big-integer";
import {GraphQLClient} from "graphql-request";
import Loader from "react-loader-spinner";

const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT);
const itemsPerPage = 256;
let identitiesPageIdx = 0;
let attestationsPageIdx = 0;

const getIdentitiesQuery = () =>
  `
    {
        identities(where: { disabled: false }, skip: ${identitiesPageIdx *
          itemsPerPage}, first: ${itemsPerPage}) {
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
    }
`;

const getAttestationsQuery = () =>
  `
    {
        attestations(skip: ${attestationsPageIdx *
          itemsPerPage}, first: ${itemsPerPage}) {
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

const getVisibleLinks = (nodes, links) => {
  const visibleLinks = [];
  for (const l of links) {
    if (
      nodes.some(n => n.id === l.source) &&
      nodes.some(n => n.id === l.target)
    ) {
      visibleLinks.push(Object.assign({}, l));
    }
  }
  return visibleLinks;
};

const QueryVisualizer = () => {
  const [isLaunched, setIsLaunched] = React.useState(false);
  const [nodes, setNodes] = React.useState([]);
  const [links, setLinks] = React.useState([]);

  const processIdentities = prevNodes => ({ identities }) => {
    const newNodes = [];
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
      newNodes.push({
        id,
        val,
        color,
        name
      });
    }
    const currentNodes = prevNodes.concat(newNodes);
    setNodes(currentNodes);
    identitiesPageIdx += 1;
    if (identities.length === itemsPerPage) fetchMoreIdentities(currentNodes);
  };

  const fetchMoreIdentities = prevNodes => {
    client.request(getIdentitiesQuery()).then(processIdentities(prevNodes));
  };

  const processAttestations = prevLinks => ({ attestations }) => {
    const newLinks = [];
    for (const attestation of attestations) {
      newLinks.push({
        source: attestation.attesterIdentity.id,
        target: attestation.subjectIdentity.id
      });
    }
    const currentLinks = prevLinks.concat(newLinks);
    setLinks(currentLinks);
    attestationsPageIdx += 1;
    if (attestations.length === itemsPerPage)
      fetchMoreAttestations(currentLinks);
  };

  const fetchMoreAttestations = prevLinks => {
    client.request(getAttestationsQuery()).then(processAttestations(prevLinks));
  };

  if (!isLaunched) {
    setIsLaunched(true);
    fetchMoreIdentities([]);
    fetchMoreAttestations([]);
  }

  const graphData = { nodes, links: getVisibleLinks(nodes, links) };
  if (!nodes.length)
    return (
      <div className={"centeringWrapper"}>
        <Loader type="Grid" color="#0000a0" height={100} width={100} />
      </div>
    );
  return (
    <ForceGraph2D
      graphData={graphData}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={0.64}
    />
  );
};

export default QueryVisualizer;
