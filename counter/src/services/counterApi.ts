// Pretend this variable lives on a server
let serverCount = 0;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCount(): Promise<number> {
  await delay(800);
  return serverCount;
}

export async function increment(): Promise<number> {
  await delay(800);
  // Uncomment to simulate random failures:
  // if (Math.random() < 0.2) throw new Error("Network error");
  serverCount += 1;
  return serverCount;
}

export async function decrement(): Promise<number> {
  await delay(800);
  serverCount -= 1;
  return serverCount;
}

export async function resetCount(): Promise<number> {
  await delay(800);
  serverCount = 0;
  return serverCount;
}
