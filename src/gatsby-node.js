const axios = require('axios').default;
const chalk = require('chalk');

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, pluginOptions) => {
    console.log(chalk`\n{blue gatsby-source-surveyjs} - Fetching data from SurveyJS API`);
  
    if (!pluginOptions || !pluginOptions.accessKey) {
      console.error(
        chalk`\n{red error} An error occurred while sourcing the active SurveyJS data - No Access Key specified`
      );
      throw new Error('No SurveyJS key was specified - Unable to source surveys');
    }
  
    const activeSurveyEndpoint = `https://api.surveyjs.io/private/Surveys/getActive?accessKey=${pluginOptions.accessKey}`;
    const archivedSurveyEndpoint = `https://api.surveyjs.io/private/Surveys/getArchive?accessKey=${pluginOptions.accessKey}`;
    const { createNode } = actions;
  
    const addSurveyNode = survey => {
      createNode({
        ...survey,
        id: createNodeId(`${survey.Id}`),
        parent: null,
        children: [],
        internal: {
          type: 'Survey',
          content: JSON.stringify(survey),
          contentDigest: createContentDigest(survey)
        }
      });
    };
  
    await axios
      .get(activeSurveyEndpoint)
      .then(response => {
        response.data.forEach(survey => {
          addSurveyNode(survey);
        });
      })
      .catch(e => {
        console.error(chalk`\n{red error} An error occurred while sourcing the active SurveyJS data`);
        throw e;
      });
  
    if (pluginOptions && pluginOptions.includeArchived === true) {
      await axios
        .get(archivedSurveyEndpoint)
        .then(response => {
          response.data.forEach(survey => {
            addSurveyNode(survey);
          });
        })
        .catch(e => {
          console.error(chalk`\n{red error} An error occurred while sourcing the archived SurveyJS data`);
          throw e;
        });
    }
  };
  