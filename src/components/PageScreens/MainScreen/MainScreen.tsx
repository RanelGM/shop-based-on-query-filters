import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "utils/constants";

export const MainScreen = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo(`${AppRoute.Catalog}/1`);
  }, [navigateTo]);

  return <></>;
};
