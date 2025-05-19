import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
    outline: 'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200',
    ghost: 'bg-transparent text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200',
    link: 'bg-transparent text-primary-600 hover:underline p-0 h-auto'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5'
  };
  
  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Loading styles
  const loadingStyles = isLoading ? 'relative text-transparent pointer-events-none' : '';
  
  // Composite styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${variant !== 'link' ? sizeStyles[size] : ''}
    ${disabled || isLoading ? disabledStyles : ''}
    ${widthStyles}
    ${loadingStyles}
    ${className}
  `;
  
  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Icon on the left */}
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className={`${children ? 'mr-2' : ''} h-5 w-5`} />
      )}
      
      {/* Button content */}
      {children}
      
      {/* Icon on the right */}
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className={`${children ? 'ml-2' : ''} h-5 w-5`} />
      )}
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default Button;