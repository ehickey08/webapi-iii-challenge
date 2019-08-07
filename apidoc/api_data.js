define({ "api": [
  {
    "type": "get",
    "url": "users",
    "title": "Request all users",
    "name": "GetUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "None",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP 200 Ok\n[{\n    \"id\": 1,\n    \"name\": \"Frodo Baggins\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>Server Error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/users/usersRouter.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "http://localhost:8001/users"
      }
    ]
  }
] });
