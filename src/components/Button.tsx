import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const isDisabled = disabled || loading;
  
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-pink-500 hover:bg-pink-600 disabled:hover:bg-pink-500 text-white focus:ring-pink-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 disabled:hover:bg-gray-600 text-white focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500 text-white focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();
  
  return (
    <button 
      className={classes} 
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default Button;