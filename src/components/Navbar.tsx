import { useNavigate } from "react-router-dom"

const Navbar = ()=>{
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar