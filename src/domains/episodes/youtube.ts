// Funções de ligação com o YouTube (infraestrutura).
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`
export const thumbnailUrl = (id: string) => (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "")
