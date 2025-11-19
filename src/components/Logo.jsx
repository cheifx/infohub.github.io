import { Link } from 'react-router-dom'

const Logo = ({ size = 'default', variant = 'light' }) => {
  const sizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-xl'
  }

  const textColor = variant === 'dark' 
    ? 'text-white group-hover:text-primary-light' 
    : 'text-gray-900 group-hover:text-primary'

  return (
    <Link to="/" className="group">
      <span className={`font-bold ${textColor} transition-colors leading-tight ${sizeClasses[size]}`}>
        RPT Digitalization Hub
      </span>
    </Link>
  )
}

export default Logo

