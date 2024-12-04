import { TConfig } from "@/types";
import { ReactNode } from "react";
type TRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
};

const routeGenerator = (config: TConfig[]) => {
  const routes = config?.map((item) => {
    const route: TRoute = { element: item.element };
    if (item?.path === "/") {
      route.index = true;
    } else {
      route.path = item.path;
    }
    return route;
  });
  return routes;
};

export default routeGenerator;
