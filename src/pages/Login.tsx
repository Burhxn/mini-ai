import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@reem.ai',
      password: 'ReemAI2024',
      rememberMe: true
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login attempt with:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      navigate('/campaign');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
     
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-gray-100/50"></div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="mx-auto w-16 h-16 mb-6 relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="8"
                    className="fill-white"
                  >
                    <animate
                      attributeName="r"
                      values="8;9;8"
                      dur="2s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </circle>
                  
                  {[0, 1, 2].map((i) => (
                    <circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                      className="origin-center"
                    >
                      <animate
                        attributeName="r"
                        values="20;32"
                        dur="2s"
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1"
                      />
                      <animate
                        attributeName="stroke-opacity"
                        values="0.6;0"
                        dur="2s"
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1"
                      />
                    </circle>
                  ))}
                  
                  {[-2, -1, 0, 1, 2].map((i) => (
                    <rect
                      key={i}
                      x={46 + i * 4}
                      y="35"
                      width="2"
                      height="30"
                      rx="1"
                      fill="white"
                      className="origin-bottom"
                    >
                      <animate
                        attributeName="height"
                        values="20;28;20"
                        dur={`${1.2 + Math.abs(i) * 0.2}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                      />
                    </rect>
                  ))}
                </svg>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              <span>Reem</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI</span>
            </h2>
            <p className="text-gray-600">Your Intelligent Voice Assistant</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="relative group">
                  <Icon 
                    icon="carbon:email" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors w-5 h-5"
                  />
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                    focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 
                    text-gray-900 placeholder-gray-400 transition-colors"
                    placeholder="Email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Icon 
                    icon="carbon:password" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors w-5 h-5"
                  />
                  <input
                    type="password"
                    {...register('password')}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                    focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 
                    text-gray-900 placeholder-gray-400 transition-colors"
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="mr-2 w-4 h-4 rounded border-gray-300 text-indigo-600 
                  focus:ring-2 focus:ring-indigo-500/20 bg-white"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium 
              hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
              disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer
              transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Icon 
                    icon="carbon:circle-dash" 
                    className="w-5 h-5 animate-spin"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Icon 
                    icon="carbon:voice-activated" 
                    className="w-5 h-5 mr-2 text-white/90"
                  />
                  <span>Login</span>
                </div>
              )}
            </button>

            <p className="text-center text-gray-600 text-sm">
              New to Reem AI?{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors inline-flex items-center">
                Create account
                <Icon 
                  icon="carbon:arrow-right" 
                  className="w-4 h-4 ml-1"
                />
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 