// Regenera src/environments/environment.ts a partir de las env vars configurables en Vercel
// (Project Settings > Environment Variables): SHOW_INSTAGRAM, SHOW_LINKEDIN, INSTAGRAM_URL, LINKEDIN_URL.
// Si una variable no está definida, se usa el valor por defecto (visible / URL actual de Kernel Studio).
const fs = require('fs');
const path = require('path');

function toBool(value, fallback) {
  if (value === undefined) return fallback;
  return value.trim().toLowerCase() !== 'false';
}

function toUrl(value, fallback) {
  if (!value || !value.trim()) return fallback;
  return value.trim();
}

const showInstagram = toBool(process.env.SHOW_INSTAGRAM, true);
const showLinkedin = toBool(process.env.SHOW_LINKEDIN, true);
const instagramUrl = toUrl(process.env.INSTAGRAM_URL, 'https://www.instagram.com/');
const linkedinUrl = toUrl(process.env.LINKEDIN_URL, 'https://www.linkedin.com/company/kernel-studio-solutions');

const content = `// Archivo generado automáticamente por scripts/set-social-icons.cjs — no editar a mano.
export const environment = {
  showInstagram: ${showInstagram},
  showLinkedin: ${showLinkedin},
  instagramUrl: ${JSON.stringify(instagramUrl)},
  linkedinUrl: ${JSON.stringify(linkedinUrl)},
};
`;

const outPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
fs.writeFileSync(outPath, content);
console.log(`[set-social-icons] showInstagram=${showInstagram} showLinkedin=${showLinkedin} instagramUrl=${instagramUrl} linkedinUrl=${linkedinUrl}`);
