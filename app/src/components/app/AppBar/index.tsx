import { Link } from "react-router-dom"
//
export const AppBar = () => {
  return (
    <nav className="flex space-x-4 justify-center items-center font-bold">
      <Link to="/">demo</Link>
      <Link to="about">about</Link>
    </nav>
  )
}
