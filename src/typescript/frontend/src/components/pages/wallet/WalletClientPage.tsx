"use client";

import { ExplorerLink } from "components/explorer-link/ExplorerLink";
import { FormattedNumber } from "components/FormattedNumber";
import SearchBar from "components/inputs/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs/tabs";
import { useEmojiPicker } from "context/emoji-picker-context";
import { useUserEmojicoinBalances } from "lib/hooks/queries/use-fetch-owner-emojicoin-balances";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import { ROUTES } from "router/routes";

import AptosIconBlack from "@/icons/AptosBlack";
import type { SymbolEmoji } from "@/sdk/emoji_data";
import { formatDisplayName, type ValidAptosName } from "@/sdk/utils";

import { WalletPortfolioTable } from "./WalletPortfolioTable";
import { WalletTransactionTable } from "./WalletTransactionTable";

export const WalletClientPage = ({ address, name }: { address: string; name?: ValidAptosName }) => {
  const resolvedName = name ?? address;
  const { ownedCoins, totalValue, isLoading } = useUserEmojicoinBalances(address);
  const [tab, setTab] = useState<string>("portfolio");
  const emojis = useEmojiPicker((s) => s.emojis);
  const setEmojis = useEmojiPicker((s) => s.setEmojis);

  // Replace the address in the router URL if the name is defined.
  const router = useRouter();
  const pathname = usePathname();
  useEffectOnce(() => {
    if (name && name !== address && pathname.endsWith(address)) {
      router.replace(`${ROUTES.wallet}/${name}`);
    }
  });

  return (
    <div className="max-w-[100vw] px-2 sm:min-w-[80vw] md:min-w-[800px]">
      <span className="pixel-heading-2 mobile-sm:px-4 sm:px-0 flex flex-wrap gap-x-2 mb-4">
        Portfolio of{" "}
        <ExplorerLink className="text-ec-blue hover:underline" type="account" value={address}>
          {formatDisplayName(resolvedName, { noTruncateANSName: true })}
        </ExplorerLink>
      </span>
      <div className="flex justify-between w-full mb-4 flex-wrap gap-x-2 mobile-sm:px-4 sm:px-0">
        <span className="pixel-heading-3b">
          {"Total value: "}
          {isLoading ? (
            <>{"???"}</>
          ) : (
            <>
              <FormattedNumber scramble value={totalValue} style="sliding-precision" />
              <AptosIconBlack className="icon-inline ml-[2px]" />
            </>
          )}
        </span>
        <span className="pixel-heading-3b">
          Unique owned: {isLoading ? "?" : ownedCoins.length}
        </span>
      </div>
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
        <div className="flex min-h-[45px] items-end justify-between w-full flex-wrap">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trade-history">Trade History</TabsTrigger>
          </TabsList>
          {tab === "trade-history" && <SearchBar />}
        </div>
        <TabsContent value="portfolio">
          <WalletPortfolioTable address={address} />
        </TabsContent>
        <TabsContent value="trade-history">
          <WalletTransactionTable
            address={address}
            emojis={emojis as SymbolEmoji[]}
            setEmojis={(emojis) => setEmojis(emojis)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
