export const sortByTimestampDesc = (key: string = "updatedAt") =>
  null != key ? sortByTimestampDesc_.bind({ key }) : undefined

function sortByTimestampDesc_(this: { key: string }, node1: any, node2: any) {
  const { key } = this
  return new Date(node2[key]).getTime() - new Date(node1[key]).getTime()
}
