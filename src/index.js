import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
//import { Text } from "@chakra-ui/react";
//import ReactDOM from "react-dom";
//import { StrictMode } from "react";
import { 
    ChakraProvider, 
} from "@chakra-ui/react";
import theme from "./theme/theme";

//const rootElement = document.getElementById("root");
const root = createRoot(document.getElementById("root"));
const commentInput = document.getElementById("comment");

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS={false}>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  {/*rootElement*/}
);
