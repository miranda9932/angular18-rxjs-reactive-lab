import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

if (existsSync('.git')) {
  console.log('Ya existe un repositorio git en esta carpeta.');
  process.exit(0);
}

execSync('git init', { stdio: 'inherit' });
execSync('git add .', { stdio: 'inherit' });

try {
  execSync('git commit -m "chore: initial angular18-rxjs-reactive-lab scaffold"', {
    stdio: 'inherit'
  });
} catch {
  console.log('No se pudo crear el commit automáticamente. Revisa git user.name y user.email.');
}
