
import { ApolloClient ,createHttpLink} from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
 
import { setContext } from '@apollo/client/link/context';
export const domain = "api.crsquare.finance"


export const apiURI = ({
    URL: 'https://dev.crsquare.finance/graphql/',

})

const httpLink = createHttpLink({
    uri: apiURI.URL,
  });
  

  export const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
                     'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
      }
    }
  });
  



  
export const client =  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });