// test/helpers/env.js
// Must be required before ../../server so module-level config sees it.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-not-used-anywhere-else";
process.env.OPENROUTER_API_KEY = "test-openrouter-key";
process.env.RATE_LIMIT_AI_MAX = "10000";
process.env.RATE_LIMIT_API_MAX = "10000";
process.env.RATE_LIMIT_AUTH_MAX = "10000";
delete process.env.OPENROUTER_MODEL;
delete process.env.OPENROUTER_FALLBACK_MODELS;
delete process.env.CHAT_REQUIRE_AUTH;
delete process.env.CHAT_TIMEOUT_MS;
delete process.env.MONGODB_URI;

// No test may reach the network: any fetch that a test did not stub fails
// loudly instead of calling OpenRouter or Brevo.
const realFetch = globalThis.fetch;
const blockedFetch = async (url) => {
  throw new Error(`Unexpected network call in tests: ${url}`);
};
globalThis.fetch = blockedFetch;

const stubFetch = (impl) => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init, body: init && init.body ? JSON.parse(init.body) : undefined });
    return impl(url, init);
  };
  return calls;
};

const restoreFetch = () => {
  globalThis.fetch = blockedFetch;
};

module.exports = { stubFetch, restoreFetch, realFetch };
