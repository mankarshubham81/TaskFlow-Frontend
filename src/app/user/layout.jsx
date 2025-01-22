import UsersNavebar from "@/components/UsersNavebar"
const UserLayout = ({ children }) => {
  return (
    <div>
      <div>
        <UsersNavebar />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default UserLayout