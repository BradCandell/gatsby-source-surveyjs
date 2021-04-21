# gatsby-source-surveyjs

Source plugin for pulling surveys and their responses into [Gatsby][gatsby] from the [SurveyJS.io][surveyjs] service.

## Features

- Provides survey and response data via the SurveyJS [Public][surveyjs-public] and [Private][surveyjs-private] APIs
- Simplifies the integration of the `survey-react` within Gatsby

## Install

```shell
npm install gatsby-source-surveyjs
```

## Configuration

After creating your account on the [SurveyJS Cloud Service][surveyjs-cloud], you will need to obtain your private API access token by visiting the [Private API documentation][surveyjs-private].

Then, in your `gatby-config.js` add the following:

```js
module.exports = {
  plugins: [
  {
    resolve: "gatsby-source-surveyjs",
    options: {
      accessKey: "example-3462324256as26243sk3d93",
    }
  }
];
```

**Note:** Your API access key should be considered a secret, and treated as such. See [Environment Variables](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/) for more information.

## How to Query

You can query the nodes that were created from SurveyJS using GraphQL like the following:

**Note:** Learn to use the GraphQL tool and Ctrl+Spacebar at `http://localhost:8000/___graphql` to discover the types and properties of your GraphQL model.

```graphql
{
  allSurveys {
    edges {
      node {
        Id
        PostId
        Name
      }
    }
  }
}
```

All SurveyJS data is pulled using the [SurveyJS Private API][surveyjs-private]. Data is made available in the same structure as
provided by the API.

[gatsby]: https://www.gatsbyjs.org/
[surveyjs]: https://surveyjs.io/
[surveyjs-cloud]: https://surveyjs.io/Overview/Service
[surveyjs-private]: https://surveyjs.io/Help/Index?apiType=private
[surveyjs-public]: https://surveyjs.io/Help/Index?apiType=public
