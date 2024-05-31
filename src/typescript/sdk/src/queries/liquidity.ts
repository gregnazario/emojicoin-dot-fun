import "server-only";

import { type ContractTypes, type JSONTypes, toLiquidityEvent } from "../types";
import { STRUCT_STRINGS } from "../utils";
import { TABLE_NAME, ORDER_BY } from "./const";
import {
  type AggregateQueryResultsArgs,
  type EventsAndErrors,
  aggregateQueryResults,
} from "./query-helper";
import { wrap } from "./utils";
import { postgrest } from "./inbox-url";

export enum LiquidityEventType {
  Provide,
  Remove,
}

export type LiquidityEventQueryArgs = {
  user?: string;
  marketID?: number | bigint;
  liquidityEventType?: LiquidityEventType;
};

export const paginateLiquidityEvents = async (
  args: LiquidityEventQueryArgs & Omit<AggregateQueryResultsArgs, "query">
): Promise<EventsAndErrors<ContractTypes.LiquidityEvent>> => {
  const { user, marketID, liquidityEventType } = args;
  let query = postgrest
    .from(TABLE_NAME)
    .select("*")
    .filter("type", "eq", STRUCT_STRINGS.LiquidityEvent)
    .order("transaction_version", ORDER_BY.DESC);

  // If these arguments are provided, add them to the query filters.
  query = user ? query.eq("data->provider", wrap(user)) : query;
  query = marketID ? query.eq("data->market_id", wrap(marketID)) : query;
  query = liquidityEventType
    ? query.eq("data->liquidity_provided", wrap(liquidityEventType))
    : query;

  const { data, errors } = await aggregateQueryResults<JSONTypes.LiquidityEvent>({ query });

  return {
    events: data.map((e) => toLiquidityEvent(e)),
    errors,
  };
};
