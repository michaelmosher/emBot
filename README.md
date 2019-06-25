# emBot

AKA microservices chat bot

This iteration was created to test the viability of a microservice architecture for a chat bot.
As such, every primary function is handled by a single service.

## Services

| Service                   | Function                                                             |
|---------------------------|----------------------------------------------------------------------|
| chat-interface            | Initial ingress point for messages coming from Hangouts Chat         |
| embot-core                | Route each intent to another service for fulfillment                 |
| google-calendar-interface | Request calendar info from Google Calendar API                       |
| slack-in-interface        | Initial ingress point for messages coming from Slack                 |
| slack-out-interface       | Send replies to Slack (could also be used to initiate conversations) |

Each of these services has a Dockerfile to facilitate launching them. A [docker-compose.yml file](docker-compose.yml) is provided to easily create and launch all five services.

## Environment Variables

Configuration is provided to each service using envionrment variables.
Where appropriate, default values are provided for each variable in the compose file.
Otherwise, the variables most be set before running the compose commands.
A **.env** file in the application root directory will be read, if one exists.

### Service-to-service communication

These variables are to provide service endpoints to the services that rely on them.
When using docker-compose to deploy them, the defaults should suffice.
Otherwise, they must be overwritten to allow service communication.

| Variable               | Description                                       |
|------------------------|---------------------------------------------------|
| CALENDAR_INTERFACE_URL | The URL for the google calendar interface service |
| CORE_URL               | The URL for the embot core service                |
| SLACK_OUT_URL          | The URL for the slack out interface interface     |

### Other configuration

| Variable                     | Description                                                     |
|------------------------------|-----------------------------------------------------------------|
| AWS_ACCESS_KEY_ID            | Used to access AWS Lex. Not required if AWS_PROFILE is provided |
| AWS_SECRET_ACCESS_KEY        | Used to access AWS Lex. Not required if AWS_PROFILE is provided |
| AWS_SESSION_TOKEN            | Used to access AWS Lex. Required if using temporary credentials |
| AWS_PROFILE                  | Used to access AWS Lex. Required if using cached credentials    |
| GOOGLE_SERVICE_ACCOUNT_EMAIL | Used to programmatically authenticate against Google's APIs     |
| GOOGLE_SERVICE_ACCOUNT_KEY   | Used to programmatically authenticate against Google's APIs     |
| HANGOUTS_SECRET_TOKEN        | Used to verify incoming Hangouts Chat requests                  |
| JIRA_BASE_URL                | Used to access Jira issues API                                  |
| JIRA_USERNAME                | Used to access Jira issues API                                  |
| JIRA_PASSWORD                | Used to access Jira issues API                                  |
| LEX_BOT_VERSION              | Used to determine which Lex Bot version to use                  |
| SLACK_API_TOKEN              | Used to make outgoing Slack requests                            |
| SLACK_SECRET_TOKEN           | Used to verify incoming Slack requests                          |

## Docker Compose Commands

Naturally, you must [install Docker-compose](https://docs.docker.com/compose/install/) before using it.

### Build containers

```shell
docker-compose build
```

### Start services

```shell
docker-compose up --no-start
docker-compose start
```

### Stop services

```shell
docker-compose down
```

To deploy new code changes, pull the new code from GitHub, stop service, build containers, and start services.

## Web Server configuration

Coming soon

## AWS Lex Configuration

Coming soon

## Google Service Account Setup

Coming soon
