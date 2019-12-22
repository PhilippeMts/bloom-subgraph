import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const MyGraph = ({ data }) => {
  const { bloomAccounts, bloomAddresses, bloomAddressHistoryItems } = data;
  const nodes = [];
  const links = [];
  for (const account of bloomAccounts) {
    nodes.push({
      id: account.id,
      name: account.id,
      val: account.addresses.length * 4,
      color: account.addresses.length ? "#0000a0" : "#a00000"
    });
    for (const accountAddress of account.addresses) {
      links.push({
        source: accountAddress.id,
        target: account.id
      });
    }
  }
  for (const address of bloomAddresses) {
    nodes.push({
      id: address.id,
      name: address.address,
      val: 2,
      color: address.account ? "#000060" : "#600000"
    });
    for (const addressHistoryItem of address.history) {
      links.push({
        source: addressHistoryItem.id,
        target: address.id
      });
    }
  }
  for (const historyItem of bloomAddressHistoryItems) {
    nodes.push({
      id: historyItem.id,
      name: historyItem.creationBlock,
      val: 1,
      color: !historyItem.deletionBlock ? "#000020" : "#200000"
    });
  }
  const graphData = {nodes, links};
  return <ForceGraph2D graphData={graphData} />;
};

export default MyGraph;
