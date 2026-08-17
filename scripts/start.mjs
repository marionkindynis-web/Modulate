import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

for (const filePath of [
  resolve(root, ".env"),
  resolve(root, ".env.local"),
  resolve(root, ".env.production"),
  resolve(root, ".env.production.local"),
  resolve(homedir(), ".env.local"),
  resolve(root, "smtp.env"),
  resolve(homedir(), "smtp.env"),
  resolve(homedir(), "sites/modulate.ch/smtp.env"),
  "/srv/customer/smtp.env",
  "/srv/customer/sites/modulate.ch/smtp.env",
]) {
  loadEnvFile(filePath);
}

const smtpReady = Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
console.info(`[start] SMTP ${smtpReady ? "ready" : "not configured"}`);

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "start"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
