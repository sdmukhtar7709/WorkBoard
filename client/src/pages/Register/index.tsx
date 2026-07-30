import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { ApiError } from '../../services/apiClient'
import { register } from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import type { RegisterPayload } from '../../types/auth'

const initialFormState: RegisterPayload = {
  username: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [formData, setFormData] = useState<RegisterPayload>(initialFormState)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError('')

    try {
      const response = await register(formData)
      setUser(response.data.user)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.details?.message ?? error.message)
        return
      }

      setFormError('Unable to register right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        id="register-username"
        label="Username"
        type="text"
        placeholder="Choose a username"
        autoComplete="username"
        required
        value={formData.username}
        onChange={(event) =>
          setFormData((current) => ({ ...current, username: event.target.value }))
        }
      />

      <Input
        id="register-password"
        label="Password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
        required
        value={formData.password}
        onChange={(event) =>
          setFormData((current) => ({ ...current, password: event.target.value }))
        }
      />

      <Input
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        required
        value={formData.confirmPassword}
        onChange={(event) =>
          setFormData((current) => ({
            ...current,
            confirmPassword: event.target.value,
          }))
        }
      />

      {formError ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" loading={isSubmitting}>
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