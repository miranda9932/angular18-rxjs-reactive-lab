import { existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

if (!existsSync('.git')) {
  console.error('No se encontró .git. Ejecuta primero: npm run repo:init');
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'artifacts');
const outFile = path.join(outDir, 'angular18-rxjs-reactive-lab.zip');
mkdirSync(outDir, { recursive: true });
execSync(`git archive --format=zip --output="${outFile}" HEAD`, { stdio: 'inherit' });
console.log(`ZIP generado en: ${outFile}`);
