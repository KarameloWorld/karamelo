import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}) => {
  const baseClasses = 'rounded-lg bg-card text-card-foreground';
  
  const variantClasses = {
    default: 'border border-border',
    outlined: 'border-2 border-border',
    elevated: 'border border-border shadow-lg'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`.trim();
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

const CardHeader: FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col space-y-1.5 pb-6 ${className}`.trim()}>
      {children}
    </div>
  );
};

const CardTitle: FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`.trim()}>
      {children}
    </h3>
  );
};

const CardDescription: FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`.trim()}>
      {children}
    </p>
  );
};

const CardContent: FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`pt-0 ${className}`.trim()}>
      {children}
    </div>
  );
};

const CardFooter: FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center pt-6 ${className}`.trim()}>
      {children}
    </div>
  );
};

// Export du composant principal et des sous-composants
export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };