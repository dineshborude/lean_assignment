export const getTestCredentials = () => {
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      '\n❌ Missing required environment variables!\n\n' +
      'TEST_USERNAME and TEST_PASSWORD must be set.\n\n' +
      'Setup instructions:\n' +
      '1. Copy .env.example to .env:\n' +
      '   cp .env.example .env\n\n' +
      '2. Edit .env and add your credentials\n\n' +
      '3. Run tests: npm test\n'
    );
  }

  return { username, password };
};

export const getCheckoutInfo = () => {
  const firstName = process.env.CHECKOUT_FIRST_NAME;
  const lastName = process.env.CHECKOUT_LAST_NAME;
  const postalCode = process.env.CHECKOUT_POSTAL_CODE;

  if (!firstName || !lastName || !postalCode) {
    throw new Error(
      '\n❌ Missing required environment variables!\n\n' +
      'CHECKOUT_FIRST_NAME, CHECKOUT_LAST_NAME, and CHECKOUT_POSTAL_CODE must be set.\n\n' +
      'Setup instructions:\n' +
      '1. Copy .env.example to .env:\n' +
      '   cp .env.example .env\n\n' +
      '2. Edit .env and add checkout information\n\n' +
      '3. Run tests: npm test\n'
    );
  }

  return { firstName, lastName, postalCode };
};