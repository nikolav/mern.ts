export const unpackBlob = async (
  blob: Blob,
  width = 1024
): Promise<[string | undefined, Blob]> => {
  const filename$ = new Blob([blob.slice(0, width)])
  const file$ = new Blob([blob.slice(width)])
  const filename = (await filename$.text()).trim().replace(/\x00/g, "")
  return [filename, file$]
}
