import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 4) {
      newErrors.name = 'Nom trop court ! Minimum 4 caractères';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email non valide !';
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Mot de passe faible ! 8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage('Inscription réussie !');
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url("/hacker.jpg")`, // Assure-toi que l’image est dans /public/
      }}
    >
      <div className="backdrop-blur-md bg-zinc-200/30 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-emerald-600 text-center mb-4">
          Inscription
        </h1>

        {successMessage && (
          <p className="text-emerald-500 text-center mb-4 font-medium">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && (
              <p className="text-rose-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && (
              <p className="text-rose-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-emerald-600"
              >
                {showPassword ? 'Cacher' : 'Afficher'}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Soumettre */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition duration-200 font-semibold"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
