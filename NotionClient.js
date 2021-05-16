var NOTION_API_KEY = process.env.NOTION_API_KEY

var axios = require('axios')

const getAllDatabases = () => axios.get('https://api.notion.com/v1/databases/', { headers: { "Authorization": `Bearer ${NOTION_API_KEY}` }})
        .then(response => {
            results = response.data.results;
            return results.map(result => result.id)
        })
        .catch(err => console.error("Failed to fetch notion databases"))

module.exports = { 
    getAllDatabases
};

getAllDatabases().then(res => console.log(res))