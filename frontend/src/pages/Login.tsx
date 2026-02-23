import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const authData = await login(credentials);
            console.log("Login success:", authData);

            localStorage.setItem('auth', JSON.stringify(authData));

            // Vérification des droits admin/employé
            const isAdminOrStaff = authData.roles.includes('ROLE_EMPLOYE') || 
                                   authData.roles.includes('ROLE_ADMIN');
            if (isAdminOrStaff) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }

        } catch (err) {
            setError('Email ou mot de passe incorrect');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black italic text-gray-900">Connexion</h2>
                    <p className="text-gray-400 mt-2 text-sm uppercase font-bold tracking-widest">
                        Espace sécurisé
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                            onChange={(e) =>
                                setCredentials({ ...credentials, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gray-900 hover:bg-orange-600 transition-all"
                    >
                        {isLoading ? 'Vérification...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
