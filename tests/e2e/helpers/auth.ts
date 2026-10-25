import { type Page } from '@playwright/test';

export type UserRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN';

export const USER_CREDENTIALS: Record<UserRole, { email: string; pass: string; defaultRoute: string }> = {
  UMKM: {
    email: 'fikri@kopisenja.id',
    pass: 'password123',
    defaultRoute: '/dashboard'
  },
  CONSULTANT: {
    email: 'maya.suryani@beruang.id',
    pass: 'password123',
    defaultRoute: '/konsultan'
  },
  INVESTOR: {
    email: 'hendro@nusantaraventures.com',
    pass: 'password123',
    defaultRoute: '/investor'
  },
  ADMIN: {
    email: 'admin@beruang.id',
    pass: 'password123',
    defaultRoute: '/admin'
  }
};

/**
 * Perform rapid, rock-solid API authentication and hydrate the browser session
 * with cookie and localStorage without persistent addInitScript leakage.
 */
export async function loginAs(page: Page, role: UserRole): Promise<any> {
  const creds = USER_CREDENTIALS[role];
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  // 1. Authenticate with backend directly
  const response = await page.request.post(`${backendUrl}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: creds.email,
      password: creds.pass
    }
  });

  const resJson = await response.json();
  if (!response.ok() || !resJson.data?.token) {
    throw new Error(`Failed to login as ${role}: ${JSON.stringify(resJson)}`);
  }

  const { token, user } = resJson.data;

  // 2. Set the cookie on browser context
  await page.context().addCookies([
    {
      name: 'beruang_token',
      value: token,
      url: 'http://localhost:3000'
    }
  ]);

  // 3. Navigate directly to role target route
  await page.goto(creds.defaultRoute);
  await page.waitForLoadState('domcontentloaded');

  // 4. Hydrate localStorage for client-side stores
  await page.evaluate(({ token, user }) => {
    try {
      localStorage.setItem('beruang_token', token);
      localStorage.setItem('beruang_user', JSON.stringify(user));
    } catch {}
  }, { token, user });

  // 5. Wait for page component to mount
  await page.locator('h1, h2, h3, main').first().waitFor({ state: 'visible', timeout: 15000 });

  return { token, user };
}

/**
 * Clear authentication session and cookies
 */
export async function logout(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
  });
  await page.goto('/masuk');
  await page.waitForLoadState('domcontentloaded');
}
