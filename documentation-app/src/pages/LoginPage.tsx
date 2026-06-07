import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listUsers } from '../services/authService';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hints, setHints] = useState<string[]>([]);

  useEffect(() => {
    listUsers().then((users) => setHints(users.map((u) => u.login)));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(loginId, password);
    if (!ok) {
      setError('Identifiants incorrects');
      return;
    }
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-xl font-bold text-slate-900">Connexion</h1>
        <p className="mt-1 text-sm text-slate-500">
          Authentification locale (mock). Mot de passe par défaut : <code>demo</code>
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Identifiant</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              list="logins"
              required
            />
            <datalist id="logins">
              {hints.map((h) => (
                <option key={h} value={h} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-800 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}
