import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'

export default function PatientSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')
    
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { full_name: name, role: 'Patient' }
        }
      })
      if (error) throw error
      
      toast.success('Signup successful!')
      navigate('/patient/dashboard')
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-brand-sand">
      <Card className="w-full max-w-sm border-2 border-brand-ink/20 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-2xl font-heading font-extrabold tracking-tight text-brand-ink flex items-center">
              <span className="text-primary mr-1">Pelvic</span> Vitality
            </span>
          </div>
          <CardTitle className="text-2xl font-heading font-semibold">Patient Signup</CardTitle>
          <CardDescription className="font-body">
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-heading">Full Name</Label>
              <Input id="name" name="name" type="text" required className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-heading">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-heading">Password</Label>
              <Input id="password" name="password" type="password" required className="font-body" />
            </div>
            {error && <div className="text-sm text-destructive font-body">{error}</div>}
            <Button type="submit" className="w-full font-heading bg-primary text-white hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/patient/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
