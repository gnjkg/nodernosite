import buttonBlue from '@/assets/images/Button-Blue.svg'
import alertIcon from '@/assets/icons/icon-alert.svg'
import dashboardIcon from '@/assets/icons/icon-dashboard.svg'
import reportsIcon from '@/assets/icons/icon-reports.svg'
import sensorsIcon from '@/assets/icons/icon-sensors.svg'
import iotDashboard from '@/assets/images/iot-dashboard.jpg'
import iotLeftShapeImage from '@/assets/images/iot-left-shape-bg.jpg'
import iotPrototype from '@/assets/images/iot-prototype.png'

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

const handleNavigate = (event, href) => {
  if (!href?.startsWith('#')) return

  event.preventDefault()
  requestAnimationFrame(() => scrollToSection(href))
}

const featureCards = [
  {
    title: 'Sensor monitoring',
    description: 'Track conditions from facilities, equipment, farms, and service areas.',
    icon: sensorsIcon,
  },
  {
    title: 'Smart alerts',
    description: 'Notify teams when thresholds, delays, or exceptions require attention.',
    icon: alertIcon,
  },
  {
    title: 'Device dashboards',
    description: 'Bring live readings and operational activity into one understandable view.',
    icon: dashboardIcon,
  },
  {
    title: 'Automated reports',
    description: 'Convert system events into summaries for owners and managers.',
    icon: reportsIcon,
  },
]

const ArrowUpRight = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.83 14.17 14.17 5.83M7.5 5.83h6.67v6.67" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
  </svg>
)

const BlueButton = ({ href, children }) => (
  <a
    href={href}
    onClick={(event) => handleNavigate(event, href)}
    className="group relative inline-block aspect-[253/49] w-[196px] max-w-full text-[13px] font-normal text-white drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-[224px] sm:text-[14px]"
  >
    <img
      src={buttonBlue}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <span className="absolute left-0 top-0 z-10 flex h-full w-[76%] items-center justify-center pb-[1px] capitalize leading-none">
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </span>
    <span className="absolute right-[2.8%] top-0 z-10 flex h-full w-[19.8%] items-center justify-center pb-[1px]">
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-rotate-[-45deg]" />
    </span>
  </a>
)

const FeatureCard = ({ feature }) => (
  <article className="flex min-h-full flex-col rounded-[22px] border border-white/16 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),rgba(255,255,255,0.055)_42%,rgba(255,255,255,0.035)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_42px_rgba(255,255,255,0.04),0_28px_70px_rgba(3,18,38,0.22)] backdrop-blur-xl sm:rounded-[26px] sm:p-7 lg:min-h-[184px] min-[1440px]:rounded-[28px] min-[1440px]:p-8">
    <img src={feature.icon} alt="" aria-hidden="true" className="size-5 shrink-0 min-[1440px]:size-6" />
    <h3 className="mt-6 text-[16px] font-normal leading-tight text-white sm:mt-8 min-[1440px]:text-[18px]">{feature.title}</h3>
    <p className="mt-3 max-w-none text-[13px] font-normal leading-[1.6] text-white/70 sm:mt-4 lg:max-w-[260px] min-[1440px]:text-[15px]">
      {feature.description}
    </p>
  </article>
)

const IotSection = () => {
  return (
    <section id="iot" className="min-h-svh scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pb-[12px] pt-0">
      <div className="mx-auto flex min-h-[calc(100svh-25px)] w-full max-w-[1704px] flex-col justify-center bg-[#1C324C] px-5 py-10 sm:px-9 sm:py-14 lg:px-16 lg:py-24 xl:px-[200px] xl:py-[118px]">
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1fr] lg:items-end lg:gap-6 min-[1440px]:gap-8">
          <div>
            <p className="text-[12px] font-normal uppercase tracking-[0.32em] text-white/90">IoT and Automation</p>
            <h2 className="mt-6 max-w-[760px] text-[32px] font-normal leading-[1.13] tracking-normal text-white sm:mt-8 sm:text-[44px] lg:text-[50px] min-[1440px]:text-[54px]">
              Connect physical operations to useful digital signals.
            </h2>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-5 sm:mt-12 lg:mt-14 lg:grid-cols-[0.98fr_1fr] lg:items-stretch lg:gap-6 min-[1440px]:mt-16 min-[1440px]:gap-8">
          <div className="relative aspect-[627/504] w-full overflow-hidden lg:aspect-auto lg:h-full">
            <svg aria-hidden="true" className="pointer-events-none absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="iot-left-image-shape" clipPathUnits="objectBoundingBox">
                  <path
                    transform="scale(0.0015948963 0.001984127)"
                    d="M627 467V37C627 16.5655 610.435 0 590 0H266.237C249.25 0 234.495 11.6876 230.606 28.224C226.717 44.7604 211.962 56.448 194.974 56.448H37C16.5654 56.448 0 73.0135 0 93.448V467C0 487.435 16.5655 504 37 504H590C610.435 504 627 487.435 627 467Z"
                  />
                </clipPath>
              </defs>
            </svg>
            <img
              src={iotLeftShapeImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              style={{ clipPath: 'url(#iot-left-image-shape)' }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {featureCards.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        <article className="mt-10 overflow-hidden rounded-[26px] border border-white/18 bg-[radial-gradient(circle_at_34%_0%,rgba(255,255,255,0.18),rgba(255,255,255,0.075)_42%,rgba(255,255,255,0.055)_100%)] px-5 pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_0_80px_rgba(255,255,255,0.045),0_34px_100px_rgba(3,18,38,0.3)] backdrop-blur-xl sm:mt-12 sm:rounded-[30px] sm:px-8 sm:pt-9 lg:mt-16 lg:min-h-[820px] lg:px-[72px] lg:pt-[54px] min-[1440px]:min-h-[930px] min-[1440px]:rounded-[34px]">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1fr] lg:items-stretch">
            <div className="max-w-[500px]">
              <span className="inline-flex max-w-full rounded-full border border-white/70 px-5 py-2 text-[9px] font-normal uppercase tracking-[0.2em] text-white sm:px-7 sm:text-[10px] sm:tracking-[0.24em]">
                Featured IoT Prototype
              </span>
              <h3 className="mt-6 max-w-[430px] text-[32px] font-normal leading-[1.13] tracking-normal text-white sm:mt-8 sm:text-[42px] min-[1440px]:text-[48px]">
                Real-Time Flood Monitoring
              </h3>
              <p className="mt-5 max-w-[510px] text-[13px] font-normal leading-[1.6] text-white min-[1440px]:text-[15px]">
                An IoT system that monitors water levels in real time, transmits live data, and sends automated alerts before flooding occurs.
              </p>

              <div className="mt-8">
                <BlueButton href="#contact">Start an IoT Project</BlueButton>
              </div>
            </div>

            <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[22px] sm:min-h-[300px] md:max-lg:min-h-0 lg:min-h-[282px] min-[1440px]:h-[306px] min-[1440px]:rounded-[26px]">
              <img src={iotPrototype} alt="Flood monitoring sensor prototype near water" className="h-auto max-h-[280px] w-full object-contain object-center sm:max-h-[340px] md:max-lg:max-h-none lg:max-h-full lg:object-right" />
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-t-[20px] bg-white sm:mt-10 sm:rounded-t-[24px] lg:mt-[70px]">
            <img src={iotDashboard} alt="Water level monitoring dashboard" className="h-auto w-full object-contain object-top" />
          </div>
        </article>
      </div>
    </section>
  )
}

export default IotSection
