import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
  index("routes/gatekeeper.tsx"),
  route("/home", "routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/upload", "routes/upload.tsx"),
] satisfies RouteConfig;