import React from "react";
import loadable from "@loadable/component";

export const AuthRouting = React.lazy(() =>
  import("../../modules/admin/pages/auth/AuthRouting")
);

export const MainPageRouting = loadable(() =>
  import("../../modules/admin/pages/mainPage/MainPageRouting")
);

export const DetailsRouting = loadable(() =>
  import("../../modules/admin/pages/detailsOrder/DetailsRouting")
);

export const WebsiteInterfacesRouting = loadable(() =>
  import("../../modules/admin/pages/WebsiteInterfaces/WebsiteInterfacesRouting")
);

export const IndexesRouting = loadable(() =>
  import("../../modules/admin/pages/indexes/IndexesRouting")
);

export const ProductRouting = loadable(() =>
  import("../../modules/admin/pages/product/ProductRouting")
);
