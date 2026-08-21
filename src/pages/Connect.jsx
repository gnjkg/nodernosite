import { useEffect } from 'react'
import { track } from '@vercel/analytics'
import logoWhite from '@/assets/logos/logo-white.svg'
import { nodernoContact, nodernoMessengerUrl } from '@/data/contact'

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

const metadata = {
  title: 'Connect with Noderno',
  description:
    "Choose how you'd like to connect with Noderno for custom software, IoT, automation, and digital solutions.",
}

const setMetaContent = (selector, content) => {
  const element = document.head.querySelector(selector)

  if (element) element.setAttribute('content', content)

  return element
}

const getMetaState = (selector) => {
  const element = document.head.querySelector(selector)

  return [element, element?.getAttribute('content')]
}

const ConnectAction = ({ href, label, description, eventName, external = false }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    onClick={() => track(eventName)}
    className="group flex min-h-[76px] w-full items-center justify-between gap-5 rounded-[16px] border border-white/18 bg-white/[0.08] px-5 py-4 text-left text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_70px_rgba(3,18,38,0.22)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[84px] sm:px-6"
  >
    <span className="min-w-0">
      <span className="block text-[16px] font-normal leading-tight sm:text-[17px]">
        {label}
      </span>
      <span className="mt-1 block text-[13px] font-normal leading-snug text-white/72 sm:text-[14px]">
        {description}
      </span>
    </span>
    <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] border border-white/20 bg-white/10 text-white transition duration-200 group-hover:bg-white group-hover:text-[#1C324C]">
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
    </span>
  </a>
)

const Connect = () => {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = document.head.querySelector('meta[name="description"]')
    const canonicalLink = document.head.querySelector('link[rel="canonical"]')
    const previousDescription = descriptionMeta?.getAttribute('content')
    const previousCanonical = canonicalLink?.getAttribute('href')

    const metaUpdates = [
      ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description],
      ['meta[property="og:url"]', nodernoContact.connectUrl],
      ['meta[name="twitter:title"]', metadata.title],
      ['meta[name="twitter:description"]', metadata.description],
    ]
    const previousMeta = metaUpdates.map(([selector]) => getMetaState(selector))

    document.title = metadata.title
    descriptionMeta?.setAttribute('content', metadata.description)
    canonicalLink?.setAttribute('href', nodernoContact.connectUrl)
    metaUpdates.forEach(([selector, content]) => setMetaContent(selector, content))

    return () => {
      document.title = previousTitle
      if (descriptionMeta && previousDescription) descriptionMeta.setAttribute('content', previousDescription)
      if (canonicalLink && previousCanonical) canonicalLink.setAttribute('href', previousCanonical)
      previousMeta.forEach(([element, content]) => {
        if (element && content) element.setAttribute('content', content)
      })
    }
  }, [])

  const actions = [
    {
      label: 'Visit Our Contact Page',
      description: 'Open the Noderno contact form.',
      href: nodernoContact.contactHref,
      eventName: 'connect_contact_click',
    },
    {
      label: 'Call Noderno',
      description: nodernoContact.phoneDisplay,
      href: nodernoContact.phoneHref,
      eventName: 'connect_call_click',
    },
    {
      label: 'Message Us on Messenger',
      description: 'Continue through Facebook Messenger.',
      href: nodernoMessengerUrl,
      eventName: 'connect_messenger_click',
      external: true,
    },
    {
      label: 'Visit Noderno Website',
      description: 'Return to the homepage.',
      href: nodernoContact.homeHref,
      eventName: 'connect_website_click',
    },
  ]

  return (
    <div className="min-h-svh bg-[#1C324C] px-[12px] py-[12px] text-white">
      <main className="flex min-h-[calc(100svh-24px)] items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),rgba(255,255,255,0.06)_34%,rgba(28,50,76,0.96)_78%)] px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:rounded-[32px] sm:px-8 lg:px-10">
        <section
          aria-labelledby="connect-title"
          className="mx-auto flex w-full max-w-[520px] flex-col items-center text-center"
        >
          <a
            href={nodernoContact.homeHref}
            aria-label="Noderno home"
            className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <img src={logoWhite} alt="Noderno" className="h-auto w-[178px] select-none sm:w-[196px]" />
          </a>

          <p className="mt-8 text-[12px] font-normal uppercase tracking-[0.32em] text-white/82">
            LET&apos;S BUILD SOMETHING.
          </p>

          <h1
            id="connect-title"
            className="mt-4 text-[31px] font-normal leading-[1.12] tracking-normal sm:text-[38px]"
          >
            Technology built around your business.
          </h1>

          <p className="mt-4 max-w-[330px] text-[15px] font-normal leading-[1.55] text-white/78 sm:text-[16px]">
            How would you like to connect?
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10">
            {actions.map((action) => (
              <ConnectAction key={action.eventName} {...action} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Connect
