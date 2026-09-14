const { PrismaClient } = require("@prisma/client");
const { randomBytes, scryptSync } = require("node:crypto");

const db = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${key}`;
}

const products = [
  ["prod-gold-hunter-ea", "gold-hunter-ea", "Gold Hunter EA", "MT5", "EA", 12900, "2.4.1"],
  ["prod-liquidity-pro", "liquidity-pro", "Liquidity Pro", "TradingView", "Indicator", 4900, "1.8.0"],
  ["prod-smart-structure-pro", "smart-structure-pro", "Smart Structure Pro", "MT5", "Indicator", 7900, "3.1.0"],
  ["prod-trend-velocity", "trend-velocity", "Trend Velocity", "MT5", "Trading System", 19900, "1.5.2"],
  ["prod-session-guard", "session-guard", "Session Guard", "MT4", "Tool", 3900, "1.2.6"],
  ["prod-vps-elite", "vps-elite", "VPS Elite", "MT5", "VPS", 2900, "Managed plan"],
];

async function main() {
  for (const [id, slug, name, platform, category, priceCents, version] of products) {
    await db.product.upsert({
      where: { id },
      update: { name, platform, category, priceCents, version, active: true },
      create: { id, slug, name, platform, category, priceCents, version },
    });
  }

  const user = await db.user.upsert({
    where: { email: "demo@luxfocuss.local" },
    update: {},
    create: { name: "Demo Trader", email: "demo@luxfocuss.local", passwordHash: hashPassword("DemoTrader!2026") },
  });

  const product = await db.product.findUniqueOrThrow({ where: { id: "prod-gold-hunter-ea" } });
  const order = await db.order.create({
    data: {
      userId: user.id,
      status: "PAID",
      totalCents: product.priceCents,
      provider: "demo",
      providerRef: "demo-order-10421",
      items: { create: { productId: product.id, unitCents: product.priceCents } },
    },
  });

  await db.license.create({
    data: {
      key: "LUXF-DEMO-GOLD-2026",
      userId: user.id,
      productId: product.id,
      orderId: order.id,
      expiresAt: new Date("2026-12-25T23:59:59.000Z"),
      allowedDevices: 2,
    },
  });

  console.log("Seeded products, demo user, order, and license.");
}

main().finally(() => db.$disconnect());
