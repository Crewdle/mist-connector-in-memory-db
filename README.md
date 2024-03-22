# Crewdle Mist In-Memory DB Connector

## Introduction

The Crewdle Mist In-Memory DB Connector is crafted to seamlessly integrate your Key-Value Database service with an in-memory data management solution. This connector ensures rapid and efficient data storage directly in memory, providing a flawless mechanism for managing and accessing your data with exceptional speed. By streamlining the synchronization of your database service with the in-memory system, this connector offers effortless and reliable data handling without complex configurations or additional tools. It stands as a perfect solution for those aiming to harness the power of in-memory databases for fast, scalable, and on-the-fly data processing.

## Getting Started

Before diving in, ensure you have installed the [Crewdle Mist SDK](https://www.npmjs.com/package/@crewdle/web-sdk).

## Installation

```bash
npm install @crewdle/mist-connector-in-memory-db
```

## Usage

```TypeScript
import { InMemoryDatabaseConnector } from '@crewdle/mist-connector-in-memory-db';

// Create a new SDK instance
const sdk = await SDK.getInstance('[VENDOR ID]', '[ACCESS TOKEN]', {
  keyValueDatabaseConnector: InMemoryDatabaseConnector,
});
```

## Need Help?

Reach out to support@crewdle.com or raise an issue in our repository for any assistance.

## Join Our Community

For an engaging discussion about your specific use cases or to connect with fellow developers, we invite you to join our Discord community. Follow this link to become a part of our vibrant group: [Join us on Discord](https://discord.gg/XJ3scBYX).
