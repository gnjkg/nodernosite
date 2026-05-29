import clsx from 'clsx'

const Container = ({ className, children, ...props }) => {
  return (
    <div className={clsx('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10', className)} {...props}>
      {children}
    </div>
  )
}

export default Container
