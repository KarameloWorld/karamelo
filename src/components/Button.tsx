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
  
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 disabled:hover:bg-primary text-primary-foreground focus:ring-ring',
    secondary: 'bg-secondary hover:bg-secondary/80 disabled:hover:bg-secondary text-secondary-foreground focus:ring-ring',
    danger: 'bg-destructive hover:bg-destructive/90 disabled:hover:bg-destructive text-destructive-foreground focus:ring-ring'
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
        <span className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current opacity-70" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default Button;