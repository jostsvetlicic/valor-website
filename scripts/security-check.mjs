#!/usr/bin/env node
/**
 * Secret scan for the VALOR website.
 *
 *   node scripts/security-check.mjs           scan every tracked file
 *   node scripts/security-check.mjs --staged  scan only files staged for commit
 *                                             (used by the pre-commit hook)
 *
 * Fails (exit 1) if it finds something that looks like a real credential, or
 * if a real .env file is tracked by git. Runs locally, in the pre-commit hook
 * and in CI (.github/workflows/security.yml).
 */

import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const staged = process.argv.includes("--staged");

const PATTERNS = [
  ["AWS access key", /AKIA[0-9A-Z]{16}/],
  ["Anthropic API key", /sk-ant-[A-Za-z0-9_-]{20,}/],
  ["OpenAI-style secret key", /sk-(?:proj-)?[A-Za-z0-9_-]{32,}/],
  ["GitHub token", /gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,}/],
  ["Slack token", /xox[baprs]-[A-Za-z0-9-]{10,}/],
  ["Google API key", /AIza[0-9A-Za-z_-]{35}/],
  ["Stripe live key", /(?:sk|rk)_live_[A-Za-z0-9]{20,}/],
  ["Resend API key", /\bre_[A-Za-z0-9]{24,}/],
  ["Private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  [
    "Hard-coded secret",
    /\b(?:api[_-]?key|secret|token|password|passwd)\b["']?\s*[:=]\s*["'][A-Za-z0-9_/+=-]{16,}["']/i,
  ],
];

// Binary and generated files are skipped.
const SKIP = /\.(png|jpe?g|webp|gif|ico|svg|mp4|webm|woff2?|ttf|pdf)$|^package-lock\.json$|^scripts\/security-check\.mjs$/i;

const git = (args) => execFileSync("git", args, { encoding: "utf8" });
const files = (staged ? git(["diff", "--cached", "--name-only", "--diff-filter=ACM"]) : git(["ls-files"]))
  .split("\n")
  .filter(Boolean);

const problems = [];

for (const file of files) {
  // A real env file must never be committed (only .env.example).
  if (/(^|\/)\.env(\..+)?$/.test(file) && !file.endsWith(".env.example")) {
    problems.push(`${file}: environment file is tracked by git`);
    continue;
  }
  if (SKIP.test(file)) continue;
  let text;
  try {
    if (statSync(file).size > 2_000_000) continue;
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  text.split("\n").forEach((line, i) => {
    for (const [label, re] of PATTERNS) {
      if (re.test(line)) problems.push(`${file}:${i + 1}: possible ${label}`);
    }
  });
}

if (problems.length) {
  console.error("Security check failed. Remove these before committing:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error("\nSecrets belong in .env.local (never committed) or in Vercel's environment settings.");
  process.exit(1);
}
console.log(`Security check passed: ${files.length} file(s) scanned, no secrets found.`);
