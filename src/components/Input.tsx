import type { FC, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'filled';
}

const Input: FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  
  const baseClasses = 'w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';
  
  const variantClasses = {
    default: `bg-background border-input ${hasError ? 'border-destructive focus:border-destructive' : 'border-input focus:border-ring'} text-foreground placeholder:text-muted-foreground`,
    filled: `bg-muted border-transparent ${hasError ? 'border-destructive focus:border-destructive' : 'focus:border-ring'} text-foreground placeholder:text-muted-foreground`
  };
  
  const paddingClasses = leftIcon && rightIcon 
    ? 'pl-10 pr-10 py-2' 
    : leftIcon 
    ? 'pl-10 pr-3 py-2' 
    : rightIcon 
    ? 'pl-3 pr-10 py-2' 
    : 'px-3 py-2';
  
  const inputClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${className}`.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-medium text-foreground block"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={`${inputId}-error`} 
          className="text-sm text-destructive" 
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`} 
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;