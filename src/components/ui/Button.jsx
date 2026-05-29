import clsx from 'clsx'

const Button = ({ as: Component = 'button', variant = 'primary', className, children, ...props }) => {
  const styles = {
    primary:
      'inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/80',
    ghost:
      'inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-400/40'
  }

  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </Component>
  )
}

export default Button
