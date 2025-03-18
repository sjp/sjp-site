+++
date = "2025-03-13"
title = "Tanstack Query SharedWorker Persister"
+++

[Tanstack Query](https://tanstack.com/query/latest) is a popular library for managing browser API requests and their associated state.
One useful feature it provides is a query cache, preventing unnecessary network requests for the same resource.
By using the `@sjpnz/query-shared-worker-persister` package, it is possible to share this cache across multiple tabs and windows.

The sharing of a cache is possible due to a [`SharedWorker`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) that provides a single web worker that is shared across all tabs and windows from pages of the same origin.

## Demo

A demo app that utilises the caching mechanism is available here: <https://sjp.co.nz/projects/query-shared-worker-persister/demo>

The source for the react application is available on [GitHub](https://github.com/sjp/query-shared-worker-demo)

## Install

This package is published on `npm`, and developed on [GitHub](https://github.com/sjp/query-shared-worker-persister).

```shell
npm install @sjpnz/query-shared-worker-persister
```

## Usage

Let's start by creating a `queryClient` in a typical React application.
One change that we need to make is to configure the lifetime of cached values.
Without further configuration, all values are considered stale and require re-fetching on each page load.

```typescript
import { QueryClient } from '@tanstack/react-query';

// Configure all queries to be considered stale after 5 minutes
const STALE_TIME = 1000 * 60 * 5;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
});
```

Now lets configure the `queryClient` so that when changes are made to the cache, they are saved to the `SharedWorker`.

```typescript
import { createSharedWorkerPersister } from '@sjpnz/query-shared-worker-persister';

const sharedWorkerPersister = createSharedWorkerPersister();

persistQueryClient({ 
  queryClient,
  persister: sharedWorkerPersister 
});
```

Highly recommended is to configure the `queryClient` using `broadcastQueryClient`.
Without it, the cached query values are only loaded when a new tab or window is opened.
Using a `broadcastQueryClient` enables updates to be shared across different tabs and windows when any change is made to the query cache.

```typescript
import { broadcastQueryClient } from '@tanstack/react-query-broadcast-client-experimental';

broadcastQueryClient({ queryClient });
```

Lastly, provide the configured `queryClient` as per usual.

```typescript
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello, world!</h1>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

## Further Information

For more information visit the repository on [GitHub](https://github.com/sjp/query-shared-worker-persister).
'