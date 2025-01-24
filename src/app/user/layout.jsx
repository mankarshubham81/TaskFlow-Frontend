import Navbar from "@/components/Navbar"
const UserLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default UserLayout