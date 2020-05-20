import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import SdkAuth, { TokenProvider } from "@commercetools/sdk-auth";

// Create token provider for the commercetools project
const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth({
    host: "https://auth.us-central1.gcp.commercetools.com",
    projectKey: "commerce-tool-poc",
    credentials: {
      clientId: "yqL2x2YJ_PLXGuX_j97P6fkW",
      clientSecret: "LNR3l8MmRx_litYciokxqU77b4AO_kDm",
    },
  }),
  fetchTokenInfo: (sdkAuth) => sdkAuth.anonymousFlow(),
});

const httpLink = createHttpLink({
  uri: "https://api.us-central1.gcp.commercetools.com/commerce-tool-poc/graphql",
});

const authLink = setContext((_, { headers = {} }) =>
  tokenProvider
    .getTokenInfo()
    .then((tokenInfo) => `${tokenInfo.token_type} ${tokenInfo.access_token}`)
    .then((authorization) => ({ headers: { ...headers, authorization } }))
);

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
