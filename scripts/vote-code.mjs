#!/usr/bin/env node
// Gera um lote de códigos curtos e seus hashes para uma votação presencial de baixa complexidade.
// Os códigos em texto puro ficam em private/ (ignorado pelo Git); somente os hashes vão para public/.
import { createHash, randomBytes } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const publicFile = resolve(root, "public/vote-code-hashes.json")
const privateFile = resolve(root, "private/vote-codes.txt")
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sem I, O, 0 e 1 para evitar confusão ao digitar
const action = process.argv[2] ?? "generate"

function hashCode(code) {
  return createHash("sha256").update(code.trim().toUpperCase()).digest("hex")
}
function generateCode() {
  const bytes = randomBytes(8)
  const chars = [...bytes].map((byte) => alphabet[byte & 31]).join("")
  return `RV-${chars.slice(0, 4)}-${chars.slice(4)}`
}

if (action === "generate") {
  const count = Number.parseInt(process.argv[3] ?? "100", 10)
  if (!Number.isInteger(count) || count < 1 || count > 5000) {
    console.error("Informe a quantidade de códigos: de 1 a 5000. Ex.: node scripts/vote-code.mjs generate 100")
    process.exit(2)
  }

  const codes = new Set()
  while (codes.size < count) codes.add(generateCode())
  const list = [...codes]
  const hashes = list.map(hashCode)

  await mkdir(resolve(root, "public"), { recursive: true })
  await mkdir(resolve(root, "private"), { recursive: true })
  await writeFile(publicFile, `${JSON.stringify(hashes, null, 2)}\n`, "utf8")
  await writeFile(privateFile, `CÓDIGOS PRIVADOS DO REVocast — ${list.length} códigos\nGuarde este arquivo e distribua um código por participante.\n\n${list.join("\n")}\n`, "utf8")

  console.log(`Pronto: ${list.length} códigos gerados.`)
  console.log("Códigos para distribuir: private/vote-codes.txt")
  console.log("Hashes para o site: public/vote-code-hashes.json")
  console.log("Próximo passo: publique/republique o site para disponibilizar o novo lote de códigos.")
} else if (action === "validate" && process.argv[3]) {
  const code = process.argv[3].trim().toUpperCase()
  if (!/^RV-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code)) {
    console.log("Formato inválido. Exemplo: RV-ABCD-2345")
    process.exit(1)
  }
  try {
    const hashes = JSON.parse(await readFile(publicFile, "utf8"))
    const valid = Array.isArray(hashes) && hashes.includes(hashCode(code))
    console.log(valid ? "Código válido para este lote (isso não confirma se já foi usado no navegador)." : "Código não encontrado neste lote.")
    process.exit(valid ? 0 : 1)
  } catch {
    console.error("Ainda não há lote gerado. Execute: node scripts/vote-code.mjs generate 100")
    process.exit(2)
  }
} else {
  console.log("Uso:")
  console.log("  node scripts/vote-code.mjs generate 100")
  console.log("  node scripts/vote-code.mjs validate RV-ABCD-2345")
  process.exit(2)
}
