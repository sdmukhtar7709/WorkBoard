import { Link } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function LoginPage() {
  return (
    <form className="space-y-5">
      <Input
        id="login-username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        autoComplete="username"
      />

      <Input
        id="login-password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      <Button type="submit" className="w-full">
        Login
      </Button>

      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
          Register
        </Link>
      </p>
    </form>
  )
}