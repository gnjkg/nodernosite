import { useEffect, useMemo, useState } from 'react'
import buttonShape from '@/assets/images/Button.svg'
import logoMark from '@/assets/logos/logo-mark.svg'
import logoWhite from '@/assets/logos/logo-white.svg'

const navItems = ['Services', 'IoT', 'Process', 'About',]

const stickyContainerClass =
  'mx-auto w-full max-w-[1704px] px-5 sm:px-9 lg:px-16 xl:px-[200px]'
const topContainerClass = 'mx-auto w-full max-w-[1304px]'

const getNavbarClearance = () => (window.matchMedia('(min-width: 1024px)').matches ? 80 : 88)

const getSectionScrollTop = (target, { center = false } = {}) => {
  const navbarClearance = getNavbarClearance()
  const viewportHeight = window.innerHeight
  const availableHeight = Math.max(viewportHeight - navbarClearance, 1)
  const targetTop = target.getBoundingClientRect().top + window.scrollY
  const targetHeight = target.offsetHeight

  if (center) {
    return targetTop - navbarClearance - (availableHeight - targetHeight) / 2
  }

  return targetTop - navbarClearance
}

const scrollToSection = (href) => {
  if (!href?.startsWith('#')) return false

  const target = document.getElementById(href.slice(1))

  if (!target) return false

  const baseTop = Math.max(0, getSectionScrollTop(target, { center: href === '#contact' }))
  const rawTop = target.getBoundingClientRect().top + window.scrollY
  const top = href === '#contact' ? baseTop : Math.max(0, rawTop)

  if (window.lenis) {
    window.lenis.scrollTo(top, {
      force: true,
      duration: href === '#contact' ? 0.4 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  if (window.location.hash !== href) {
    window.history.pushState(null, '', href)
  } else {
    window.history.replaceState(null, '', href)
  }

  return true
}

const ArrowUpRight = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.83 14.17 14.17 5.83M7.5 5.83h6.67v6.67"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
)

const MenuIcon = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 32 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4h26M3 12h26M3 20h26" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
  </svg>
)

const CloseIcon = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </svg>
)

const RevealText = ({ children }) => (
  <span className="relative inline-block overflow-hidden align-bottom leading-none">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
      {children}
    </span>
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hidden group-hover:-translate-y-full group-focus-visible:-translate-y-full"
    >
      {children}
    </span>
  </span>
)

const Logo = ({ compact = false }) => (
  <a
    href="/"
    draggable="false"
    onDragStart={(e) => e.preventDefault()}
    style={{ WebkitTapHighlightColor: 'transparent' }}
    className={`inline-flex h-12 items-center overflow-hidden outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 ${
  compact ? 'w-[52px]' : 'w-[154px]'
}`}
    aria-label="Noderno home"
    onClick={(event) => {
      event.preventDefault()
      window.history.replaceState(null, '', '/')

      if (window.lenis) {
        window.lenis.scrollTo(0, { force: true, duration: 0.8 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }}
  >
    <img
      src={compact ? logoMark : logoWhite}
      alt="Noderno"
      draggable="false"
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserDrag: 'none' }}
      className={compact ? 'pointer-events-none h-auto w-[52px] select-none' : 'pointer-events-none h-auto w-[154px] select-none'}
    />
  </a>
)

const HeaderButton = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={(event) => {
      if (!href) event.preventDefault()
      onClick?.(event, href)
    }}
    className="group relative hidden h-[48px] w-[247px] shrink-0 overflow-hidden justify-self-end text-[14px] font-normal text-[#1d71c6] drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:inline-flex"
  >
    <img
      src={buttonShape}
      alt=""
      aria-hidden="true"
      className="absolute left-0 top-0 h-[49px] w-[253px] max-w-none object-none transition duration-200 group-hover:brightness-[0.98]"
    />
    <span className="absolute left-0 top-0 z-10 flex h-full w-[76%] items-center justify-center pb-[1px] capitalize leading-none">
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </span>
    <span className="absolute right-[0.4%] top-0 z-10 flex h-full w-[19.8%] items-center justify-center pb-[1px]">
      <ArrowUpRight className="size-5 transition-transform duration-300 ease-out group-hover:rotate-45" />
    </span>
  </a>
)

const DesktopNav = ({ onNavigate }) => (
  <nav
    aria-label="Primary navigation"
    className="hidden h-[48px] w-[352px] items-center justify-center gap-[41px] rounded-[10px] border-2 border-white/30 bg-white/[0.23] px-10 text-[14px] font-normal capitalize  backdrop-blur-[14px] backdrop-saturate-150 [backdrop-filter:blur(14px)_saturate(150%)] [-webkit-backdrop-filter:blur(34px)_saturate(150%)] lg:flex"
  >
    {navItems.map((item) => (
      <a
        key={item}
        href={`#${item.toLowerCase()}`}
        className="group leading-none focus:outline-none"
        onClick={(event) => onNavigate(event, event.currentTarget.getAttribute('href'))}
      ><span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
         <RevealText>{item}</RevealText>
      </span>
       
      </a>
    ))}
  </nav>
)

const MobileMenuButton = ({ isOpen, onClick }) => (
  <button
    type="button"
    className="inline-flex size-10 items-center justify-center justify-self-end rounded-[8px] text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
    aria-label="Open navigation menu"
    aria-controls="mobile-navigation"
    aria-expanded={isOpen}
    onClick={onClick}
  >
    <MenuIcon className="h-6 w-8" />
  </button>
)

const MobileMenu = ({ isOpen, links, onClose, onNavigate }) => (
  <div
    id="mobile-navigation"
    role="dialog"
    aria-modal="true"
    aria-hidden={!isOpen}
    inert={isOpen ? undefined : ''}
    className={`fixed inset-0 z-[80] overflow-y-auto border-0 border-[#058BFF] bg-[#1C324C] px-7 py-7 text-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] transition duration-300 ease-out lg:hidden ${
      isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-[0.98] opacity-0'
    }`}
  >
    <div className="flex h-12 items-center justify-between">
     <Logo compact />
      <button
        type="button"
        className="inline-flex size-12 items-center justify-center rounded-[8px] text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Close navigation menu"
        onClick={onClose}
      >
        <CloseIcon className="size-6" />
      </button>
    </div>

    <nav aria-label="Mobile navigation" className="h-full flex flex-col items-center justify-center gap-8 pb-10">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="group inline-flex items-center gap-4 text-[20px] font-normal uppercase leading-none tracking-normal"
          onClick={(event) => onNavigate(event, link.href)}
        >
          <RevealText>{link.label}</RevealText>
          <ArrowUpRight className="size-6 transition-transform duration-300 ease-out group-hover:rotate-45" />
        </a>
      ))}
    </nav>
  </div>
)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuLinks = useMemo(
    () => [
      ...navItems.map((item) => ({ label: item, href: `#${item.toLowerCase()}` })),
      { label: 'Discuss Your Work Flow', href: '#contact' },
    ],
    [],
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const handleNavClick = (event, href) => {
  event.preventDefault()

  setIsMenuOpen(false)
  document.body.style.overflow = ''

  if (href === '#home') {
    window.history.replaceState(null, '', '/')
  }

  requestAnimationFrame(() => scrollToSection(href))
}

  const shellClass = isScrolled ? 'fixed inset-x-0 top-3 z-[60] px-[12px]' : 'relative z-[60] w-full'
  const containerClass = isScrolled ? stickyContainerClass : topContainerClass

  return (
    <>
      <div className="relative z-[60] h-12">
        <header className={shellClass}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0" />
            <div className={containerClass}>
              <div className="grid h-12 w-full grid-cols-[1fr_auto] items-center gap-4 transition-colors duration-300 ease-out lg:grid-cols-[1fr_auto_1fr]">
                     <div className="hidden lg:block">
  <Logo compact={isScrolled} />
</div>

<div className="lg:hidden">
  <Logo compact />
</div>

              <DesktopNav onNavigate={handleNavClick} />
              <HeaderButton href="#contact" onClick={handleNavClick}>
                Discuss Your Workflow
              </HeaderButton>
              <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(true)} />
            </div>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        links={menuLinks}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  )
}

export default Navbar
