import { expect, test } from '@playwright/test';
import { IEmailProvider, IEmailReader } from '../../pom/sauceLabs/emailProvider/iEmailProvider';

class InMemoryEmailProvider implements IEmailProvider {
  private readonly emailContent = 'You received a bank transfer of $100.34';

  public async login(_user: string, _password: string): Promise<void> {}

  public async goToInbox(): Promise<void> {}

  public async openEmail(_fromWho: string, _subject: string): Promise<string> {
    return this.emailContent;
  }
}

async function completeEmailWorkflow(provider: IEmailProvider): Promise<string> {
  await provider.login('test@email.com', 'password');
  await provider.goToInbox();
  return provider.openEmail('sender@example.com', 'Transfer received');
}

async function readTransfer(reader: IEmailReader): Promise<string> {
  return reader.openEmail('sender@example.com', 'Transfer received');
}

test.describe('SOLID: Liskov substitution and interface segregation', () => {
  test('any IEmailProvider can replace the production email provider', async () => {
    const provider = new InMemoryEmailProvider();

    const content = await completeEmailWorkflow(provider);

    expect(content).toBe('You received a bank transfer of $100.34');
  });

  test('a reader consumer depends only on IEmailReader', async () => {
    const readerOnly: IEmailReader = {
      openEmail: async () => 'Reader-only content'
    };

    await expect(readTransfer(readerOnly)).resolves.toBe('Reader-only content');
  });
});