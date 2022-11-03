let ID: number = 1
export const idGen = () => {
  const s = parseInt(`${Math.random() * Date.now() * ID++}`, 10)
  return s.toString(36).slice(2)
}
