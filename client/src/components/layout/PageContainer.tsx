import type { PropsWithChildren } from 'react'

type PageContainerProps = PropsWithChildren<{
  className?: string
}>

export default function PageContainer({
  children,
  className = '',
}: PageContainerProps) {
  return (
    <div
      className={[
        'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}