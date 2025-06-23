import React from "react";
import loadable from "@loadable/component";

export const HomeUserRouting = React.lazy(() =>
  import("../../modules/user/pages/Home/HomeRouting")
);

export const ShopUserRouting = loadable(() =>
  import("../../modules/user/pages/Shop/ShopRouting")
);

export const SingleProductUserRouting = loadable(() =>
  import("../../modules/user/pages/SingleProduct/SingleProductRouting")
);
