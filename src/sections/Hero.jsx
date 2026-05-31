import Navbar from '@/components/shared/Navbar'
import heroVideo from '@/assets/videos/hero-video.mp4'
import buttonShape from '@/assets/images/Button.svg'
import heroPoster from '@/assets/images/hero-image.jpg'

const ArrowUpRight = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.83 14.17 14.17 5.83M7.5 5.83h6.67v6.67"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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

const handleHeroNavigate = (event, href) => {
  if (!href?.startsWith('#')) return

  event.preventDefault()
  requestAnimationFrame(() => scrollToSection(href))
}

const SplitButton = ({ href, children, className = 'inline-block', widthClassName = 'w-full max-w-[224px] sm:w-[224px]' }) => (
  <a
    href={href}
    onClick={(event) => handleHeroNavigate(event, href)}
    className={`group relative aspect-[253/49] max-w-full text-[14px] font-normal text-[#1d71c6] drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${widthClassName} ${className}`}
  >
    <img
      src={buttonShape}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:brightness-[0.98]"
    />
    <span className="absolute left-0 top-0 z-10 flex h-full w-[76%] items-center justify-center pb-[1px] capitalize leading-none">
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </span>
    <span className="absolute right-[2.8%] top-0 z-10 flex h-full w-[19.8%] items-center justify-center pb-[1px]">
      <ArrowUpRight className="size-5 transition-transform duration-300 ease-out group-hover:-rotate-[-135deg]" />
    </span>
  </a>
)

const titleText = 'Software, Automation & IoT Systems for Growing Businesses'
const descriptionText =
  'Philippines-based Noderno helps businesses work more efficiently with custom software, automated workflows, IoT monitoring, and digital systems built to grow with you.'

const SplitText = ({ text, as: Tag = 'span', className = '', wordDelay = 42, startDelay = 0 }) => (
  <Tag aria-label={text} className={className}>
    {text.split(' ').map((word, index, words) => (
      <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
        <span
          className="hero-split-word inline-block will-change-[opacity,transform]"
          style={{ '--split-delay': `${startDelay + index * wordDelay}ms` }}
        >
          {word}
        </span>
        {index < words.length - 1 ? '\u00a0' : ''}
      </span>
    ))}
  </Tag>
)

const Hero = () => {
  return (
    <section id="home" className="min-h-svh scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pt-[12px]">
      <style>
        {`
          @keyframes hero-split-in {
            from {
              opacity: 0;
              transform: translate3d(0, 0.65em, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .hero-split-word {
            animation: hero-split-in 920ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: var(--split-delay);
            transform-origin: 50% 100%;
          }

          @keyframes hero-reveal-in {
            from {
              opacity: 0;
              transform: translate3d(0, 12px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes hero-navbar-in {
            0% {
              visibility: hidden;
            }
            1% {
              visibility: visible;
            }
            100% {
              visibility: visible;
            }
          }

          .hero-navbar-reveal {
            animation: hero-navbar-in 640ms ease-out both;
            animation-delay: 1880ms;
          }

          .hero-cta-reveal {
            animation: hero-reveal-in 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: var(--hero-reveal-delay);
            will-change: opacity, transform;
          }

          @keyframes hero-video-shell-in {
            0%,
            42% {
              margin-left: calc(var(--hero-shell-gap) * -1);
              margin-right: calc(var(--hero-shell-gap) * -1);
              margin-top: calc(var(--hero-shell-gap) * -1);
              min-height: 100svh;
              width: calc(100% + var(--hero-shell-gap) + var(--hero-shell-gap));
              border-radius: 0;
            }
            100% {
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
              min-height: var(--hero-shell-height);
              width: 100%;
              border-radius: var(--hero-shell-radius);
            }
          }

          .hero-video-shell {
            --hero-shell-gap: 12px;
            --hero-shell-height: calc(100svh - 25px);
            animation: hero-video-shell-in 1800ms cubic-bezier(0.22, 1, 0.36, 1) both;
            will-change: border-radius, margin, min-height, width;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-navbar-reveal,
            .hero-cta-reveal,
            .hero-video-shell,
            .hero-split-word {
              animation: none;
            }
          }
        `}
      </style>
      <div className="hero-video-shell relative min-h-[var(--hero-shell-height)] w-full overflow-hidden rounded-[26px]  px-5 py-6 text-white [--hero-shell-radius:26px] sm:rounded-[32px] sm:px-9 sm:[--hero-shell-radius:32px] lg:rounded-[27px] lg:px-16 lg:py-7 lg:[--hero-shell-radius:27px] xl:px-[200px] min-[1729px]:px-[calc((100%-1304px)/2)]">
          <video
  src={heroVideo}
  poster={heroPoster}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  disablePictureInPicture
  controls={false}
  controlsList="nodownload nofullscreen noremoteplayback"
  className="pointer-events-none absolute inset-0 hidden size-full object-cover object-[52%_50%] sm:block lg:object-center"
/>

<img
  src={heroPoster}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 size-full object-cover object-[52%_50%] sm:hidden"
/>
        <div className="absolute inset-0 bg-[#0b3f85]/[0.02]" aria-hidden="true" />

        <div className="hero-navbar-reveal relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-154px)] max-w-[859px] -translate-y-2 flex-col items-center justify-center text-center sm:min-h-[calc(100svh-166px)] lg:min-h-[calc(100svh-158px)] lg:-translate-y-5">
          <SplitText
            as="h1"
            text={titleText}
            className="max-w-[859px] text-[34px] font-normal leading-[1.15] tracking-normal sm:text-[42px] lg:text-[50px]"
            startDelay={1980}
          />

          <SplitText
            as="p"
            text={descriptionText}
            className="mt-6 max-w-[763px] text-[15px] font-normal leading-[1.6] sm:text-[16px]"
            wordDelay={20}
            startDelay={2580}
          />

          <SplitButton href="#services" className="hero-cta-reveal mt-10 inline-block [--hero-reveal-delay:3180ms]" widthClassName="w-[224px]">
            View Services
          </SplitButton>
        </div>
      </div>
    </section>
  )
}

export default Hero
