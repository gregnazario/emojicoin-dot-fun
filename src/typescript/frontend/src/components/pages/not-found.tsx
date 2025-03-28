"use client";

import { Text } from "components";
import Button from "components/button";
import { Page } from "components/layout/components/page";
import { translationFunction } from "context/language-context";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const StyledNotFoundPage = styled(Page)`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundComponent: React.FC = () => {
  const { t } = translationFunction();
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/");
  };

  return (
    <StyledNotFoundPage>
      <Text textScale="pixelDisplay1" textTransform="uppercase">
        {t("Not found Page")} 404
      </Text>

      <Button onClick={onClickHandler} scale="lg">
        {t("Go to home page")}
      </Button>
    </StyledNotFoundPage>
  );
};

export default NotFoundComponent;
