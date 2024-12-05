// src/components/LoginForm.tsx
import { useState, type FormEvent } from 'react';
import '../assets/styles/login.scss'; // Importar el archivo SCSS para estilos
import { User } from '../classes/User';

interface ILogin{
    username: string,
    password: string
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] =useState<ILogin>({
        username: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        try {
            await new User(formData as User).login();
            setSuccessMessage('Login succefully.'); 
            window.location.assign('/AdminPanel');
        } catch (error) {
            setErrorMessage('Error: ' + (error as Error).message);
        }
    };

    return (
        <div className="login-form-container">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
