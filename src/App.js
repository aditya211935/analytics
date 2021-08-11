import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";

import theme from "common/theme";
import store from "common/store";
import Layout from "common/layout";

import Analytics from "components/analytics";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Analytics />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
