# Voting

This module contains API calls related to the voting process.

## `submit`

Currently our only method on this module, this submits user votes. The formatting is done in the `dndSelectors` file. Upon success this endpoint will return the prompt for the next day, allowing users to get a slight headstart on the competition if they're logged in while voting.
