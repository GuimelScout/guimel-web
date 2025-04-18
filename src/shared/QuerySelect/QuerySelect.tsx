import {
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from "@apollo/client";
import { Loader, Select, SelectProps } from "@mantine/core";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
import { QueryMode } from "@/gql/graphql";

interface QuerySelectProps extends SelectProps {
  /**
   * Query to fetch data
   */
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  /**
   * Accessor to data in query result
   */
  accessor: string;
  /**
   * Function to map item from query data to { label, value } object
   * @param item - item from query data
   * @returns { label, value } object
   */
  mapper?: (item: any) => { label: string; value: string };
  /**
   * Enable async search. When enabled, query will be refetched on every search change and
   * data will be limited to only 20 results. Use this option when you have a lot of data that
   * shouldn't be fetched at once. As a general suggestion, start by not using this option and
   * enable it only if you have performance issues.
   * @default false
   */
  asyncSearch?: boolean;
  /**
   * Function to map search value to query variables. Required only when asyncSearch is enabled
   * @param value - search value
   * @returns where variables
   */
  whereMapper?: (value?: string) => any;
}

/**
 * Component to fetch data from a query and render it in select. Works with
 * any graphql query.
 *
 * @example
 * <QuerySelect
 *  query={ListBranches}
 *  accessor="branches"
 *  label="Branch"
 * />
 *
 * @example
 * <QuerySelect
 *  query={ListBranches}
 *  accessor="branches"
 *  label="Branch"
 *  mapper={(item) => ({ label: item.name, value: item.id })}
 * />
 */
export function QuerySelect({
  query,
  accessor,
  mapper = (item) => ({ label: item.name, value: item.id }),
  asyncSearch = false,
  whereMapper = (value) => ({
    where: { name: { contains: value, mode: QueryMode.Insensitive } },
  }),
  ...props
}: QuerySelectProps) {
  const [search, setSearch] = useState("");
  const [fetch, { data, loading }] = useLazyQuery(query);
  const items = data?.[accessor] || [];

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (asyncSearch) {
      fetch(whereMapper?.(search));
    }
  }, [search, asyncSearch, fetch]);

  if (asyncSearch) {
    if (!whereMapper) {
      throw new Error("whereMapper is required when asyncSearch is enabled");
    }

    props.searchable = true;
    props.searchValue = search;
    props.onSearchChange = setSearch;
  }

  return (
    <Select
      variant="filled"
      withCheckIcon={false}
      {...props}
      data={items.map(mapper)}
      rightSection={loading ? <Loader size="xs" /> : null}
    />
  );
}
