"use client";

import "./module.css";

import { FormattedNumber } from "components/FormattedNumber";
import { Arrow } from "components/svg";
import Text from "components/text";
import { useEventStore, useUserSettings } from "context/event-store-context";
import { translationFunction } from "context/language-context";
import { motion, type MotionProps, useAnimationControls, useMotionValue } from "framer-motion";
import { emojisToName } from "lib/utils/emojis-to-name-or-symbol";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Emoji } from "utils/emoji";

import { Column, Flex } from "@/containers";
import { useUsdMarketCap } from "@/hooks/use-usd-market-cap";
import { SortMarketsBy } from "@/sdk/indexer-v2/types/common";

import {
  borderVariants,
  eventToVariant as toVariant,
  glowVariants,
  onlyHoverVariant,
  textVariants,
} from "./animation-variants/event-variants";
import {
  calculateGridData,
  determineGridAnimationVariant,
  type EmojicoinAnimationEvents,
  LAYOUT_DURATION,
  tableCardVariants,
} from "./animation-variants/grid-variants";
import EmojiMarketPageLink from "./LinkOrAnimationTrigger";
import type { GridLayoutInformation, TableCardProps } from "./types";

const TableCard = ({
  index,
  marketID,
  emojis,
  staticMarketCap,
  staticVolume24H,
  rowLength,
  prevIndex,
  pageOffset,
  runInitialAnimation,
  sortBy,
  ...props
}: TableCardProps & GridLayoutInformation & MotionProps) => {
  const { t } = translationFunction();
  const isMounted = useRef(true);
  const controls = useAnimationControls();
  const animationsOn = useUserSettings((s) => s.animate);

  const stateEvents = useEventStore(
    (s) => s.getMarket(emojis.map((e) => e.emoji))?.stateEvents ?? []
  );
  const animationEvent = stateEvents.at(0);

  const { secondaryLabel, secondaryMetric, marketCap } = useMemo(() => {
    const { allTimeVolume, lastSwapVolume, marketCap } = animationEvent
      ? {
          allTimeVolume: animationEvent.state.cumulativeStats.quoteVolume,
          lastSwapVolume: animationEvent.lastSwap.quoteVolume,
          marketCap: animationEvent.state.instantaneousStats.marketCap,
        }
      : {
          allTimeVolume: 0n,
          lastSwapVolume: 0n,
          marketCap: staticMarketCap,
        };
    const [secondaryLabel, secondaryMetric] =
      sortBy === SortMarketsBy.BumpOrder
        ? ["Last Swap", lastSwapVolume]
        : sortBy === SortMarketsBy.AllTimeVolume
          ? ["All Time Vol", allTimeVolume]
          : ["24h Volume", staticVolume24H];
    return {
      secondaryLabel,
      secondaryMetric,
      marketCap,
    };
  }, [sortBy, animationEvent, staticVolume24H, staticMarketCap]);

  const usdMarketCap = useUsdMarketCap(marketCap);

  // Keep track of whether or not the component is mounted to avoid animating an unmounted component.
  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const runAnimationSequence = useCallback(
    (event: EmojicoinAnimationEvents) => {
      const [nowMs, eventMs] = [new Date().getTime(), event.transaction.timestamp.getTime()];
      // Only animate the event if it occurred within the last 5 seconds.
      if (nowMs - eventMs < 5000) {
        const variant = toVariant(event);
        controls.stop();
        if (isMounted.current) {
          controls.start(variant).then(() => {
            if (isMounted.current) {
              controls.start("initial");
            }
          });
        }
      }
    },
    [controls]
  );

  useEffect(() => {
    if (animationEvent) {
      runAnimationSequence(animationEvent);
    }
  }, [animationEvent, runAnimationSequence, sortBy]);

  const { curr, prev, variant, displayIndex, layoutDelay } = useMemo(() => {
    const { curr, prev } = calculateGridData({
      index,
      prevIndex,
      rowLength,
    });
    const { variant, layoutDelay } = determineGridAnimationVariant({
      curr,
      prev,
      rowLength,
      runInitialAnimation,
    });
    const displayIndex = index + pageOffset + 1;
    return {
      variant,
      curr,
      prev,
      displayIndex,
      layoutDelay,
    };
  }, [prevIndex, index, rowLength, pageOffset, runInitialAnimation]);

  // By default set this to 0, unless it's currently the left-most border. Sometimes we need to show a temporary border
  // though, which we handle in the layout animation begin/complete callbacks and in the outermost div's style prop.
  // Always show the left border when there's something in the search bar.
  const borderLeftWidth = useMotionValue(curr.col === 0 ? 1 : 0);

  useEffect(() => {
    if (curr.col === 0) {
      borderLeftWidth.set(1);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [curr]);

  return (
    <motion.div
      layout
      layoutId={`${sortBy}-${marketID}`}
      initial={
        variant === "initial"
          ? {
              opacity: 0,
            }
          : variant === "unshift"
            ? {
                opacity: 0,
                scale: 0,
              }
            : undefined
      }
      className="grid-emoji-card group card-wrapper border-[1px] border-solid border-dark-gray !bg-black"
      variants={tableCardVariants}
      animate={variant}
      custom={{ curr, prev, layoutDelay }}
      // Unfortunately, the transition for a layout animation is separate from a variant, hence why we have
      // to fill this with conditionals.
      transition={{
        type: variant === "initial" || variant === "portal-backwards" ? "just" : "spring",
        delay: variant === "initial" ? 0 : layoutDelay,
        duration:
          variant === "initial"
            ? 0
            : variant === "portal-backwards"
              ? LAYOUT_DURATION * 0.25
              : LAYOUT_DURATION,
      }}
      style={{
        borderLeftWidth,
        borderLeftColor: "var(--dark-gray)",
        borderLeftStyle: "solid",
        borderTop: "0px solid #00000000",
        cursor: "pointer",
      }}
      onLayoutAnimationStart={() => {
        // Show a temporary left border for all elements while they are changing their layout position.
        // Note that this is probably a fairly bad way to do this. It works for now but we could easily improve it.
        // The issue is that transition has a different time than the variant, and there's no way to coalesce the two
        // easily without refactoring the entire animation orchestration. For now, we can use the setTimeout.
        setTimeout(() => {
          borderLeftWidth.set(1);
        }, layoutDelay * 1000);
      }}
      onLayoutAnimationComplete={() => {
        // Get rid of the temporary border after the layout animation completes.
        if (curr.col !== 0) {
          borderLeftWidth.set(0);
        }
      }}
      {...props}
    >
      <EmojiMarketPageLink emojis={emojis}>
        <motion.div
          animate={controls}
          variants={animationsOn ? glowVariants : {}}
          style={{
            boxShadow: "0 0 0px 0px #00000000",
            filter: "drop-shadow(0 0 0px #00000000)",
          }}
        >
          <motion.div
            className="flex flex-col relative grid-emoji-card w-full h-full py-[10px] px-[19px] overflow-hidden"
            whileHover="hover"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#00000000",
            }}
            animate={controls}
            variants={animationsOn ? borderVariants : onlyHoverVariant}
          >
            <Flex justifyContent="space-between" mb="7px">
              <span className="pixel-heading-2 text-dark-gray group-hover:text-ec-blue p-[1px]">
                {displayIndex < 10 ? `0${displayIndex}` : displayIndex}
              </span>

              <Arrow className="w-[21px] !fill-current text-dark-gray group-hover:text-ec-blue transition-all" />
            </Flex>

            <Emoji
              // Font size and line height are taken from `pixel-heading-1` and `pixel-heading-1b`.
              className={`${emojis.length <= 2 ? "text-[64px]" : "text-[52px]"} leading-[48px] text-center mb-[22px] text-nowrap`}
              emojis={emojis}
            />
            <Text
              textScale="display4"
              textTransform="uppercase"
              $fontWeight="bold"
              mb="6px"
              ellipsis
              title={emojisToName(emojis).toUpperCase()}
            >
              {emojisToName(emojis)}
            </Text>
            <Flex>
              <Column width="50%">
                <div
                  className={
                    "body-sm font-forma text-light-gray " +
                    "group-hover:text-ec-blue uppercase p-[1px] transition-all"
                  }
                >
                  {t("Market Cap")}
                </div>
                {/* TODO: Have these do a "damage"-like animation, as if it's health is being chunked.
                  Like you'd see -0.03 (the diff) pop out of the total value in red and it'd shake horizontally,
                  then fall off the screen. */}
                <motion.div
                  animate={controls}
                  variants={animationsOn ? textVariants : {}}
                  className="body-sm uppercase font-forma"
                  style={{ color: "#FFFFFFFF", filter: "brightness(1) contrast(1)" }}
                >
                  {usdMarketCap === undefined ? (
                    <FormattedNumber value={marketCap} scramble nominalize suffix=" APT" />
                  ) : (
                    <FormattedNumber value={usdMarketCap} suffix=" $" />
                  )}
                </motion.div>
              </Column>
              <Column width="50%">
                <div
                  className={
                    "body-sm font-forma text-light-gray " +
                    "group-hover:text-ec-blue uppercase p-[1px] transition-all"
                  }
                >
                  {t(secondaryLabel)}
                </div>
                <motion.div
                  animate={controls}
                  variants={animationsOn ? textVariants : {}}
                  className="body-sm uppercase font-forma"
                  style={{ color: "#FFFFFFFF", filter: "brightness(1) contrast(1)" }}
                >
                  <FormattedNumber value={secondaryMetric} scramble nominalize suffix=" APT" />
                </motion.div>
              </Column>
            </Flex>
          </motion.div>
        </motion.div>
      </EmojiMarketPageLink>
    </motion.div>
  );
};

export default TableCard;
