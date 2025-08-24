import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
  name: "Ensure project can be created",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const block = chain.mineBlock([
      Tx.contractCall('forge-core', 'create-project', [
        types.utf8('Forge Protocol Launch'),
        types.utf8('Implementing the first decentralized project management protocol'),
        types.uint(1672531200),  // Jan 1, 2024
        types.uint(1704067200),  // Jan 1, 2025
        types.uint(100000)       // Budget
      ], deployer.address)
    ]);

    assertEquals(block.receipts.length, 1);
    block.receipts[0].result.expectOk().expectUint(1);
  }
});