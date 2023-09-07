import { createRoot } from "react-dom/client";
import { ReactTags } from "./index";

const container = document.getElementById("root");
const root = createRoot(container || document.body);

root.render(<ReactTags placeholder="place" />);


