import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { ApiError } from '../../services/apiClient'
import { login } from '../../services/authService'
import type { LoginPayload } from '../../types/auth'

const initialFormState: LoginPayload = {
  username: '',
  password: '',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginPayload>(initialFormState)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError('')

    try {
      await login(formData)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.details?.message ?? error.message)
        return
      }

      setFormError('Unable to login right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        id="login-username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        autoComplete="username"
        required
        value={formData.username}
        onChange={(event) =>
          setFormData((current) => ({ ...current, username: event.target.value }))
        }
      />

      <Input
        id="login-password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={(event) =>
          setFormData((current) => ({ ...current, password: event.target.value }))
        }
      />

      {formError ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" loading={isSubmitting}>
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