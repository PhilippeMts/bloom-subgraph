# Bloom Subgraph

This project leverages TheGraph network to help query data from Bloom smart contracts.

It was developed as a submission to [TheGraph hackathon in late 2019](https://thegraph.com/hackathons/2019/12).

## [Demo](https://philippemts.github.io/bloom-subgraph)

A frontend interface is available for this subgraph : https://philippemts.github.io/bloom-subgraph.

We can see that three attesters (green nodes) attested some traits for a majority of the ~740 users (blue nodes).

Only a few users received attestations from more than one attester.

Users' BLT balance does not seem to be bound to their usage of the Bloom platform.
Indeed some users with a big balance (bigger blue nodes) received attestations while others did not.

The main purpose of the dynamic creation of nodes and links is to paginate queries and make it possible to load and display a large number of attestations without a detrimental initial loading time.
It does not reflect any timeline of on-chain events.  

## Subgraph

You can query this subgraph with the [online explorer](https://thegraph.com/explorer/subgraph/philippemts/bloom).

A [frontend web interface](https://philippemts.github.io/bloom-subgraph) is also available.

## Development - Scripts

- `yarn run create`, `yarn run create-local` : create the subgraph
- `yarn run codegen` : generate AssemblyScript types from the subgraph's GraphQL schema and contract ABIs
- `yarn run deploy`, `yarn run deploy-local` : deploy the subgraph
- `yarn run react-start`, `yarn run react-build`, `yarn run react-test`, `yarn run react-eject` : ReactJS scripts
- `yarn run react-deploy` : deploy `build` directory to Github Pages. You should export the `REACT_APP_GRAPHQL_ENDPOINT` variable first.

## TODO

- [x] Define GraphQL schemas.
- [x] Define TheGraph mappings.
- [x] Deploy the subgraph.
- [x] Develop a frontend interface.
- [x] Display node details on hover.
- [x] Add a better loader.
- [ ] Handle pagination on attestations.

## Resources

- [TheGraph Protocol](https://thegraph.com/)
- [Bloom](https://bloom.co/) 
