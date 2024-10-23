# TypedRoutesRepro - 2024.10.22

This is a repro of an issue with `expo-router` + typed routes, in the a monorepo that observes the "Single Version Policy" — i.e. where there's no project-level `node_modules`, and all dependencies are resolved from the workspace `node_modules`.

##### SVP links

- https://nx.dev/concepts/decisions/dependency-management#single-version-policy
- https://opensource.google/documentation/reference/thirdparty/oneversion

### Problem

The immediate issue is that there's no TS validation happening when using the `<Link />` component.

My guess is that the TS reference in `expo-env.d.ts` is looking for `expo` in a **project-level** `node_modules`, instead of **workspace-level** `node_modules`

```tsx
<reference types="expo/types" />
```

The project-level `.expo/types/router.d.ts` file, in the project-root appears to be correct:

```tsx
/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/cool`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
```

```sh
transform[stderr]: 2024-10-23T09:14:55.323Z expo:babel:router routerEntry /Users/gregorywestneat/projects/explorations/typed-routes-repro-2024-10-22/node_modules/.pnpm/expo-router@3.5.23_aaatbl2s6hkptlsgwt24ejtdwi/node_modules/expo-router/entry.js /Users/gregorywestneat/projects/explorations/typed-routes-repro-2024-10-22/apps/bitter-bandicoot-app/src/app ../../../../../apps/bitter-bandicoot-app/src/app
```

Here's a screenshot of some of the relevant files:
![image](https://github.com/user-attachments/assets/88f1421c-930e-44a3-89c9-c8be42adb09e)

## Repro Steps

### Install

```sh
pnpm install --frozen-lockfile
```

### Run tasks

To run the dev server for your app, use either one of these:

```sh
npx nx run bitter-bandicoot-app:start --web
npx nx run bitter-bandicoot-app:start --ios
```

> [!NOTE]
> The `start` target is an Nx wrapper for `expo start`, and accepts the same cli arguments, eg:
> `bitter-bandicoot-app:start --web --clear`

## Observe Issue

1. Open `apps/bitter-bandicoot-app/src/app/index.tsx`
2. Find `<Link style={styles.link} href="intentional/type/error">`
3. Observe TS Defs Not Applying to Link
4. See also `apps/bitter-bandicoot-app/expo-env.d.ts` and `apps/bitter-bandicoot-app/.expo/types/router.d.ts`
