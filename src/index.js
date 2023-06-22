import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// htmlのrootを取得して、Appというコンポーネントを書き加えている。（レンダリング）
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
 <StrictMode>
  <App />
 </StrictMode>
);
