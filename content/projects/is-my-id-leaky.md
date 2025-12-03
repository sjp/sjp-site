+++
date = "2025-03-17"
title = "Is My ID Leaky?"
+++

[Is my ID Leaky?](https://ismyidleaky.com) is a simple [Preact](https://preactjs.com) website that detects whether an identifier could reveal more information than intended.
The site is currently hosted at [ismyidleaky.com](https://ismyidleaky.com).

It is currently capable of detecting the following:

* Common integer identifiers
* [ULIDs](https://github.com/ulid/spec)
* [v1 UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_1_(date-time_and_MAC_address))
* [v7 UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_7_(timestamp_and_random))
* [K-Sortable Unique Identifiers](https://github.com/segmentio/ksuid)
* [MongoDB ObjectIds](https://www.mongodb.com/docs/manual/reference/method/ObjectId/)
* [Snowflake IDs](https://en.wikipedia.org/wiki/Snowflake_ID), including support for various platforms.

To summarise, the aforementioned identifiers reveal either when an identifier was created (in the case of ULIDs and v7 UUIDs), or quite likely how many of a given entity are present in an application. Ideally, for publicly visible identifiers, a random identifier is used (e.g. v4 UUID) or a named identifier that is not secret (e.g. GitHub usernames). Neither approaches reveal information from the system in which it runs.

## Features

* Dark mode (including toggling)
* Time-based identifiers detected and parsed
* Auto-incrementing integers also handled

For time-based identifiers, the creation date of the identifier is revealed in both UTC and the user's local time.

## Development

Currently the feature set is stable.
However, if there are further commonly used identifiers that can be detected support for those can be added in future.

The site is maintained and developed on [GitHub](https://github.com/sjp/leaky-ids)

## Tools and Libraries

This application was primarily built using the following:

* [Preact](https://preactjs.com/)
* [Vite](https://vite.dev/)
* [Pico CSS](https://picocss.com/)
* [Biome](https://biomejs.dev/)

The choice of many of these libraries was to minimise the bundle size as much as possible.

Additionally the application is pre-rendered for fast initial page loads.
