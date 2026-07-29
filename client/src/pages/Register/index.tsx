import { Link } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function RegisterPage() {
  return (
    <form className="space-y-5">
      <Input
        id="register-username"
        label="Username"
        type="text"
        placeholder="Choose a username"
        autoComplete="username"
      />

      <Input
        id="register-password"
        label="Password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
      />

      <Input
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full">
        Register
      </Button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
          Login
        </Link>
      </p>
    </form>
  )
}