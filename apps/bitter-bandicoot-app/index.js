import { registerRootComponent } from 'expo';
import '@expo/metro-runtime';
import React from 'react';
import { ExpoRoot } from 'expo-router';

// Must be exported or Fast Refresh won't update the context
export function ExpoRouterRoot() {
  const ctx = require.context('./src/app'); // Path with src folder
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(ExpoRouterRoot);
