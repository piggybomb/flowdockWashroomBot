# WashroomBot

WashroomBot is a chat bot built on the [Hubot][hubot] framework. It was
initially generated by [generator-hubot][generator-hubot]

You can test your hubot by running the following, however some plugins will not
behave as expected unless the [environment variables](#configuration) they rely
upon have been set.

You can start WashroomBot locally by running:

    % bin/hubot -a flowdock
    

Flowdock Api token must be set as environment variable. Token can be obtained on Flowdock: https://www.flowdock.com/account/tokens

    % export HUBOT_FLOWDOCK_API_TOKEN=<TOKEN>
    

Supported commands:

    status
    reserve <GENDER> <NAME> <FLOOR>
    free <GENDER> <NAME> <FLOOR>

TODO: time constraints
