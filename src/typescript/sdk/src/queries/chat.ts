import "server-only";

import { INBOX_EVENTS_TABLE, LIMIT, ORDER_BY } from "./const";
import { STRUCT_STRINGS } from "../utils";
import { type JSONTypes } from "../types";
import { wrap } from "./utils";
import { type AggregateQueryResultsArgs, aggregateQueryResults } from "./query-helper";
import { postgrest } from "./inbox-url";

export type ChatEventQueryArgs = {
  marketID: number | bigint;
};

export const paginateChatEvents = async (
  args: ChatEventQueryArgs & Omit<AggregateQueryResultsArgs, "query">
) => {
  const { marketID, maxTotalRows } = args;
  const query = postgrest
    .from(INBOX_EVENTS_TABLE)
    .select("*")
    .filter("type", "eq", STRUCT_STRINGS.ChatEvent)
    .eq("data->market_metadata->market_id", wrap(marketID))
    .limit(Math.min(LIMIT, maxTotalRows ?? Infinity))
    .order("transaction_version", ORDER_BY.DESC);

  const { data, errors } = await aggregateQueryResults<JSONTypes.ChatEvent>({
    query,
    ...args,
  });

  if (errors.some((e) => e)) {
    /* eslint-disable-next-line no-console */
    console.warn("Error fetching chat events", errors);
  }

  return data;
};