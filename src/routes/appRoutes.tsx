import { RouteType } from "./config";
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Insumos } from "../pages/Insumos";
import { Productos } from "../pages/Productos";

const appRoutes: RouteType[] = [

  {
    path: "/insumos",
    element: <Insumos />,
    state: "insumos",
    sidebarProps: {
      displayText: "Insumos",
      icon: <CategoryIcon />
    }
  },
  {
    path: "/productos",
    element: <Productos />,
    state: "productos",
    sidebarProps: {
      displayText: "Productos",
      icon: <ProductionQuantityLimitsIcon />
    }
  }
];

export default appRoutes;