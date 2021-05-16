const chai = require('chai');
const nock = require('nock');
const notionClient = require('../NotionClient.js');

describe('Test Notion Client', () => {
    it('should get all the databases in notion', () => {
        const allDatabasesResponse = {
            "has_more": false,
            "next_cursor": null,
            "object": "list",
            "results": [
                {
                    "created_time": "2021-04-10T11:35:00.000Z",
                    "id": "65de5302-9226-4923-af43-c42db816be48",
                    "last_edited_time": "2021-05-15T08:03:00.000Z",
                    "object": "database",
                    "properties": {
                        "Created": {
                            "created_time": {},
                            "id": "45f2930c-d850-458e-81a7-01a4f5a286ee",
                            "type": "created_time"
                        },
                        "Name": {
                            "id": "title",
                            "title": {},
                            "type": "title"
                        },
                        "Tags": {
                            "id": "d375f0eb-2137-4aeb-bf07-4b9aa6d5c682",
                            "multi_select": {
                                "options": []
                            },
                            "type": "multi_select"
                        },
                        "Updated": {
                            "id": "f79304de-f231-43b9-b745-6382aebf367e",
                            "last_edited_time": {},
                            "type": "last_edited_time"
                        }
                    },
                    "title": [
                        {
                            "annotations": {
                                "bold": false,
                                "code": false,
                                "color": "default",
                                "italic": false,
                                "strikethrough": false,
                                "underline": false
                            },
                            "href": null,
                            "plain_text": "Books Synopsis",
                            "text": {
                                "content": "Books Synopsis",
                                "link": null
                            },
                            "type": "text"
                        }
                    ]
                },
                {
                    "created_time": "2021-05-15T07:47:15.124Z",
                    "id": "ddc1383d-22f8-4d49-9af2-ff60ef762738",
                    "last_edited_time": "2021-05-15T08:17:00.000Z",
                    "object": "database",
                    "properties": {
                        "Name": {
                            "id": "title",
                            "title": {},
                            "type": "title"
                        },
                        "Stage": {
                            "id": "ZfWf",
                            "number": {
                                "format": "number"
                            },
                            "type": "number"
                        },
                        "Tags": {
                            "id": "FVlf",
                            "multi_select": {
                                "options": [
                                    {
                                        "color": "pink",
                                        "id": "f0f3d4e0-f38e-4d18-a889-67af40e9147d",
                                        "name": "4"
                                    }
                                ]
                            },
                            "type": "multi_select"
                        }
                    },
                    "title": [
                        {
                            "annotations": {
                                "bold": false,
                                "code": false,
                                "color": "default",
                                "italic": false,
                                "strikethrough": false,
                                "underline": false
                            },
                            "href": null,
                            "plain_text": "Pending Repetitions",
                            "text": {
                                "content": "Pending Repetitions",
                                "link": null
                            },
                            "type": "text"
                        }
                    ]
                }
            ]
        };

        nock('https://api.notion.com/',  {
            filteringScope: function(scope) {
              return 'https://api.notion.com.*/';
            }
          })

            .get('/v1/databases/')
            .reply(200, allDatabasesResponse)

        const expectedDatabaseIds = [
            "65de5302-9226-4923-af43-c42db816be48", 
            "ddc1383d-22f8-4d49-9af2-ff60ef762738"
        ];

        return notionClient.getAllDatabases()
            .then(databaseIds => chai.expect(databaseIds).to.have.members(expectedDatabaseIds))
    })  
})