import { type RouteConfig, index, route } from "@react-router/dev/routes";
import path from "path";

export default [
    index("routes/home.tsx"),
    route(path: '/auth', file:'routes/auth.tsx'),
] satisfies RouteConfig;
