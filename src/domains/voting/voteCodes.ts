// Validação dos códigos de voto (Pure Fabrication): formato, hash e lote publicado em public/vote-code-hashes.json.
// Os códigos em texto puro ficam só em private/vote-codes.txt (fora do site); aqui só se compara o hash.

const CODE_PATTERN = /^RV-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/
let validHashesPromise: Promise<Set<string>> | null = null

export const normalizeCode = (input: string) => input.trim().toUpperCase()

// Mostra só o final do código na tela (ex.: "RV-••••-2345").
export const maskCode = (code: string) => `RV-••••-${normalizeCode(code).slice(-4)}`

async function sha256(value: string): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error("A validação precisa de uma conexão HTTPS. Abra o site publicado e tente novamente.")
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function getValidHashes(): Promise<Set<string>> {
  if (!validHashesPromise) {
    validHashesPromise = fetch(`${import.meta.env.BASE_URL}vote-code-hashes.json`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Os códigos ainda não foram configurados. A organização precisa gerar o lote antes da votação.")
        const data: unknown = await response.json()
        if (!Array.isArray(data) || !data.every((v) => typeof v === "string")) throw new Error("A lista de códigos está inválida. Avise a organização.")
        return new Set(data as string[])
      })
      .catch((error) => { validHashesPromise = null; throw error })
  }
  return validHashesPromise
}

// Confere o formato e se o código pertence ao lote. Devolve o hash do código (identidade do votante).
export async function validateCode(input: string): Promise<string> {
  const code = normalizeCode(input)
  if (!CODE_PATTERN.test(code)) throw new Error("Confira o código. Exemplo: RV-ABCD-2345.")
  const hash = await sha256(code)
  const validHashes = await getValidHashes()
  if (!validHashes.has(hash)) throw new Error("Código inválido. Confira os caracteres e tente novamente.")
  return hash
}
