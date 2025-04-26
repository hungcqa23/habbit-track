import React from 'react'

interface CrownProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Crown({ className, ...props }: CrownProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 6l4 6 5-4-3 10H6L3 8l5 4 4-6z" />
    </svg>
  )
}
