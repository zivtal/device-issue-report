import dev from "./dev";
import prod from "./prod";
import global from "./global";

const IS_PROD = process.env.NODE_ENV === "production";
export default IS_PROD ? { ...prod, ...global } : { ...dev, ...global };
