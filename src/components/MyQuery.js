import React from "react";
import {gql} from "apollo-boost";
import MyGraph from "./MyGraph";
import {useQuery} from "@apollo/react-hooks";

const MyQuery = () => {
  const ACCOUNTS_QUERY = gql`
    {
      bloomAccounts {
        id
        addresses {
          id
        }
      }
      bloomAddresses {
        id
        address
        account {
          id
        }
        history {
          id
        }
      }
      bloomAddressHistoryItems {
        id
        createdDuringMigration
        creationBlock
        deletionBlock
      }
    }
  `;

  const { loading, error, data } = useQuery(ACCOUNTS_QUERY);

  return loading ? (
    "loading"
  ) : error ? (
    `error: ${error}`
  ) : (
    <MyGraph data={data} />
  );
};

export default MyQuery;
