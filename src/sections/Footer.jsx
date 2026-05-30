import buttonBlue from '@/assets/images/Button-Blue.svg'
import logoWhite from '@/assets/logos/logo-white.svg'
import logoWordmark from '@/assets/logos/logo-wordmark.svg'

const footerLinks = [
  { label: 'SERVICES', href: '#services' },
  { label: 'PROCESS', href: '#process' },
  { label: 'IoT', href: '#iot' },
  { label: 'ABOUT', href: '#about' },
]

const socialLinks = [
  { label: 'FACEBOOK', href: 'https://www.facebook.com/profile.php?id=61562167407409' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/noderno.ph' },
]

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
    window.lenis.scrollTo(top, { force: true })
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

const handleFooterNavigate = (event, href) => {
  if (!href?.startsWith('#')) return

  event.preventDefault()
  requestAnimationFrame(() => scrollToSection(href))
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

const BlueButton = ({ href, children }) => (
  <a
    href={href}
    className="group relative inline-block aspect-[253/49] w-[196px] max-w-full text-[13px] font-normal text-white drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C324C]/45 sm:w-[224px] sm:text-[14px]"
  >
    <img
      src={buttonBlue}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <span className="absolute left-0 top-0 z-10 flex h-full w-[76%] items-center justify-center pb-[1px] leading-none">
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </span>
    <span className="absolute right-[2.8%] top-0 z-10 flex h-full w-[19.8%] items-center justify-center pb-[1px]">
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-rotate-[-45deg]" />
    </span>
  </a>
)

const FooterLink = ({ href, children }) => {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onClick={(event) => handleFooterNavigate(event, href)}
      className="group inline-flex items-center gap-4 text-[14x] font-normal leading-none text-white focus:outline-none sm:text-[14px]"
    >
      <span className="relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
      <ArrowUpRight className="size-[17px] shrink-0 transition-transform duration-300 group-hover:-rotate-[-45deg]" />
    </a>
  )
}

const Footer = () => {
  return (
    <footer className="scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pb-0 pt-0">
      <div className="mx-auto w-full max-w-[1704px] bg-[#1C324C] px-5 pb-8 pt-8 sm:px-9 sm:pb-10 sm:pt-10 lg:px-16 lg:pb-12 lg:pt-14 xl:px-[200px] xl:pb-6 xl:pt-24">
        

        <div className=" grid gap-5 text-white  sm:grid-cols-2  lg:grid-cols-[1.15fr_0.5fr_0.45fr] lg:gap-16 ">
          <div>
            <a
              href="#home"
              aria-label="Noderno home"
              className="inline-flex"
              onClick={(event) => handleFooterNavigate(event, '#home')}
            >
              <img src={logoWhite} alt="Noderno" className="h-auto w-[175px] sm:w-[196px]" />
            </a>

            <address className="mt-8 not-italic sm:mt-10">
              <div>
          <a
            href="mailto:support@noderno.dev"
            className="mt-4 inline-block text-sm text-white underline underline-offset-4"
          >
            support@noderno.dev
          </a>

  <a
  href="tel:+639241386037"
  className="mt-4 block w-fit pb-1 text-sm text-white underline underline-offset-4"
>
  +63 924 138 6037
</a>
</div>
            </address>
          </div>

          <nav aria-label="Footer navigation" className="lg:pt-1">
            <ul className="space-y-6 sm:space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links" className="lg:pt-1">
            <ul className="space-y-6 sm:space-y-3 lg:text-right">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-[12px] font-normal uppercase leading-none text-white sm:mt-14 sm:text-[14px] lg:mt-36">
          &copy; 2026 NODERNO. ALL RIGHTS RESERVED.
        </p>

        <img
          src={logoWordmark}
          alt="noderno"
          className="mt-8 block h-auto w-full select-none sm:mt-10 lg:mt-0"
        />
      </div>
    </footer>
  )
}

export default Footer
