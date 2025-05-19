import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = '',
  glassEffect = false
}) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const glassStyles = glassEffect 
    ? 'bg-white bg-opacity-20 backdrop-filter backdrop-blur-md shadow-glass border border-white border-opacity-20' 
    : 'bg-white shadow-md';
  
  return (
    <div className={`${baseStyles} ${glassStyles} ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-neutral-100">
          <h3 className="font-medium text-lg text-neutral-800">{title}</h3>
        </div>
      )}
      
      <div className="p-6">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;