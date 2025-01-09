import * as bcrypt from 'bcrypt';

async function hash(payload: string) {
  const hash = await bcrypt.hash(payload, 10);
  return hash;
}

async function verify(payload: string, hash: string) {
  return await bcrypt.compare(payload, hash);
}

export const password = { hash, verify };
