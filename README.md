# Bloom Subgraph

Demo : https://philippemts.github.io/bloom-subgraph

This project leverages TheGraph network to help query data from Bloom smart contracts.

It was developed as a submission to [TheGraph hackathon in late 2019](https://thegraph.com/hackathons/2019/12).

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
- [ ] Display node details on hover.
- [ ] Add a better loader.
- [ ] Handle pagination on attestations.

## Resources

- [TheGraph Protocol](https://thegraph.com/)
- [Bloom](https://bloom.co/) 
