import { useEffect, useRef } from 'react'
import buttonBlue from '@/assets/images/Button-Blue.svg'
import aboutImage from '@/assets/images/about-img.png'
import ivan from '@/assets/images/ivan.jpg'

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
      duration: href === '#contact' ? 0.5 : 1.1,
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

const handleNavigate = (event, href) => {
  if (!href?.startsWith('#')) return

  event.preventDefault()
  requestAnimationFrame(() => scrollToSection(href))
}

const avatars = [
  {
    name: 'John Ivan Berse',
    position: 'FULL STACK DEVELOPER',
    image: ivan,
    
  },
  {
    name: 'Gian Jake Gulfan',
    position: 'UI/UX DESIGNER | FRONTEND DEVELOPER',
    image:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" y1="0" x2="1" y2="1"%3E%3Cstop stop-color="%23F7E3B0"/%3E%3Cstop offset="1" stop-color="%232E78C7"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="96" height="96" rx="48" fill="url(%23a)"/%3E%3Ccircle cx="48" cy="36" r="17" fill="%23FFF1D1"/%3E%3Cpath d="M20 87c5-19 16-30 28-30s23 11 28 30" fill="%231A3B63"/%3E%3C/svg%3E',
  },
  {
    name: 'John Michael Romanos',
    position: 'IT & ELECTRICAL TECHNICIAN',
    image:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" y1="0" x2="1" y2="1"%3E%3Cstop stop-color="%2398B6CB"/%3E%3Cstop offset="1" stop-color="%231C324C"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="96" height="96" rx="48" fill="url(%23a)"/%3E%3Ccircle cx="48" cy="38" r="18" fill="%23D7E1EA"/%3E%3Cpath d="M18 88c5-20 17-32 30-32s25 12 30 32" fill="%23202D3A"/%3E%3C/svg%3E',
  },
]

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
    onClick={(event) => handleNavigate(event, href)}
    className="group relative inline-block aspect-[253/49] w-[224px] max-w-full text-[14px] font-normal text-white drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
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
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
    </span>
  </a>
)

const AvatarItem = ({ avatar, index }) => (
  <li className="group relative transition hover:z-30" style={{ zIndex: avatars.length - index }}>
    <button
  type="button"
  onTouchStart={(e) => e.currentTarget.focus()}
  className="block size-7 overflow-visible rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 min-[390px]:size-8 sm:size-9 md:size-10 lg:size-9.5 min-[1180px]:size-[38px] min-[1500px]:size-[42px] min-[1729px]:size-[46px]"
  aria-label={`${avatar.name}, ${avatar.position}`}
>
      <img
        src={avatar.image}
        alt=""
        className="size-7 rounded-full border-2 border-[#1C324C] object-cover transition duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 min-[390px]:size-8 sm:size-9 sm:border-[2.5px] sm:group-hover:-translate-y-2 md:size-10 lg:size-9 min-[1180px]:size-[38px] min-[1500px]:size-[42px] min-[1729px]:size-[46px]"
      />
    </button>
    <span className="pointer-events-none absolute bottom-full right-0 z-40 mb-2 w-[172px] translate-y-2 rounded-[14px] border border-white/20 bg-[#1C324C]/70 px-3 py-2 text-center text-white opacity-0 shadow-[0_18px_48px_rgba(4,18,38,0.28)] backdrop-blur-[34px] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:left-1/2 sm:right-auto sm:mb-3 sm:w-max sm:max-w-[240px] sm:-translate-x-1/2 sm:px-3.5 sm:py-2.5">
      <span className="block text-[10px] font-normal leading-tight sm:text-[11px]">{avatar.name}</span>
      <span className="mt-1 block text-[9px] font-normal leading-tight text-white/70 sm:text-[10px]">{avatar.position}</span>
    </span>
  </li>
)

const AvatarList = () => (
  <ul className="isolate flex items-center -space-x-2 min-[390px]:-space-x-2.5 sm:-space-x-2.5 md:-space-x-3 lg:-space-x-2.5 min-[1180px]:-space-x-[11px] min-[1500px]:-space-x-3 min-[1729px]:-space-x-3.5">
    {avatars.map((avatar, index) => (
      <AvatarItem key={avatar.name} avatar={avatar} index={index} />
    ))}
  </ul>
)

const AboutImage = () => (
  <div className="relative order-2 mr-auto w-full max-w-[629px] min-w-0 overflow-visible lg:order-1 lg:max-w-full min-[1440px]:max-w-[629px]">
    <img
      src={aboutImage}
      alt="Blue glass Noderno mark"
      className="block h-auto w-full object-contain"
      width="629"
      height="449"
    />
    <div className="absolute bottom-[1.6%] right-[4.5%] min-[390px]:right-[3.2%] sm:bottom-[2.3%] sm:right-[5.2%] md:right-[5.7%] lg:bottom-[2.2%] lg:right-[6.8%] min-[1180px]:right-[5%] min-[1500px]:bottom-[2.1%] min-[1500px]:right-[5.7%] min-[1729px]:bottom-[1.8%] min-[1729px]:right-[6.2%]">
      <AvatarList />
    </div>
  </div>
)

const aboutHeadline =
  'Noderno builds software, automation, and IoT systems to help businesses operate smarter. Based in Bukidnon, Philippines, we focus on delivering operations that actually work.'

const HighlightHeading = ({ children, sectionRef }) => {
  const textRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const section = sectionRef?.current
    if (!text || !section) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      text.style.setProperty('--highlight-progress', '100%')
      return undefined
    }

    let frame = 0
    let currentProgress = 0

    const updateHighlight = () => {
      frame = 0

      const rect = section.getBoundingClientRect()
      const scrollDistance = Math.max(720, Math.round(window.innerHeight * 0.92))
      const targetProgress = Math.min(1, Math.max(0, -rect.top / scrollDistance))

      currentProgress += (targetProgress - currentProgress) * 0.45
      text.style.setProperty('--highlight-progress', `${currentProgress * 100}%`)

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        frame = window.requestAnimationFrame(updateHighlight)
      }
    }

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateHighlight)
      }
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('orientationchange', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('orientationchange', requestUpdate)
    }
  }, [sectionRef])

  return (
    <h2
      aria-label={children}
      className="mt-8 text-[24px] font-normal leading-[1.22] tracking-normal sm:text-[28px] lg:text-[44px] min-[1440px]:text-[50px]"
    >
      <span
        ref={textRef}
        aria-hidden="true"
        className="bg-[linear-gradient(90deg,#ffffff_var(--highlight-progress),rgba(255,255,255,0.22)_var(--highlight-progress))] bg-clip-text text-transparent"
        style={{ '--highlight-progress': '0%' }}
      >
        {children}
      </span>
    </h2>
  )
}

const About = () => {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-[calc(100svh+max(720px,92svh))] scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pb-[12px] pt-0"
    >
      <div className="sticky top-0 mx-auto grid min-h-[calc(100svh-25px)] w-full max-w-[1704px] items-center gap-12 bg-[#1C324C] px-5 py-16 sm:px-9 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1fr)] lg:gap-10 lg:px-16 lg:py-24 min-[1180px]:gap-14 xl:gap-[72px] xl:px-[200px] xl:py-[118px] min-[1440px]:gap-[84px]">
        <AboutImage />

        <div className="order-1 min-w-0 max-w-[620px] text-white lg:order-2">
          <p className="text-[12px] font-normal uppercase tracking-[0.34em] text-white/90">About</p>
          <HighlightHeading sectionRef={sectionRef}>{aboutHeadline}</HighlightHeading>

          <div className="mt-9 sm:mt-12">
            <BlueButton href="#contact">Work With Us</BlueButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
