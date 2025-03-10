import { fetchPriceFeedWithMarketState } from "@/queries/home";
import { SortMarketsBy } from "@econia-labs/emojicoin-sdk";
import { ORDER_BY } from "@sdk/indexer-v2/const";
import { unstable_cache } from "next/cache";

export const NUM_MARKETS_ON_PRICE_FEED = 25;

const fetchPriceFeed = () =>
  fetchPriceFeedWithMarketState({
    sortBy: SortMarketsBy.DailyVolume,
    orderBy: ORDER_BY.DESC,
    pageSize: NUM_MARKETS_ON_PRICE_FEED,
  });

export const fetchCachedPriceFeed = unstable_cache(
  fetchPriceFeed,
  ["price-feed-with-market-data"],
  { revalidate: 10 }
);
