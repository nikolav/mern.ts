const reSlashes = /^(.*?)(\/*)$/
const strip = (_$0: string, $1: string) => $1
export const stripEndSlashes = (text = "") => text.replace(reSlashes, strip)
