import processShape from '@/assets/images/process-shape.svg'

const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'Map workflows, bottlenecks, users, records, and the decisions each system needs to support.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Define the interface, data model, automation rules, reporting layer, and rollout plan.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Develop software, integrations, device logic, dashboards, and workflow controls.',
  },
  {
    number: '04',
    title: 'Improve',
    description: 'Monitor usage, refine workflows, and expand the system as operations grow.',
  },
]

const stepPositions = [
  'lg:left-[4.5%] lg:top-[3.5%]',
  'lg:left-[56%] lg:top-[27.5%]',
  'lg:left-[4.5%] lg:top-[53.5%]',
  'lg:left-[56%] lg:top-[78%]',
]

const mobileCardShell =
  'w-full max-w-full overflow-hidden rounded-[22px] border border-white/16 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),rgba(255,255,255,0.055)_42%,rgba(255,255,255,0.035)_100%)] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_42px_rgba(255,255,255,0.04),0_28px_70px_rgba(3,18,38,0.22)] backdrop-blur-xl sm:rounded-[26px] sm:p-7 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0'

const desktopCardShell =
  'text-white lg:absolute lg:w-[clamp(172px,14.2vw,210px)] lg:overflow-visible min-[1440px]:w-[220px] min-[1729px]:w-[238px]'

const ProcessCard = ({ step, className = '', variant = 'mobile' }) => (
  <article className={`${variant === 'desktop' ? desktopCardShell : mobileCardShell} ${className}`}>
    <p className="text-[28px] font-normal leading-none tracking-normal text-white sm:text-[34px] lg:text-[clamp(24px,2.2vw,28px)] min-[1729px]:text-[32px]">
      {step.number}
    </p>
    <h3 className="mt-6 text-[16px] font-normal leading-tight text-white lg:mt-[clamp(14px,1.6vw,20px)] lg:text-[clamp(14px,1.25vw,16px)] lg:leading-none">
      {step.title}
    </h3>
    <p className="mt-3 max-w-none text-[13px] font-normal leading-[1.6] text-white/70 sm:mt-4 sm:text-[14px] lg:mt-[clamp(8px,0.9vw,12px)] lg:max-w-full lg:text-[clamp(11px,1vw,14px)] lg:leading-[1.45] lg:text-white/68 xl:leading-[1.55] min-[1729px]:text-[14px]">
      {step.description}
    </p>
  </article>
)

const ProcessSection = () => {
  return (
    <section id="process" className="min-h-svh scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pb-[12px] pt-0">
      <div className="mx-auto grid min-h-[calc(100svh-25px)] w-full max-w-[1704px] items-center gap-12 bg-[#1C324C] px-5 py-14 sm:gap-14 sm:px-9 sm:py-18 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:px-16 lg:py-24 xl:px-[200px] xl:py-[118px]">
        <div className="max-w-[540px] text-white lg:pt-10">
          <p data-mobile-nav-anchor className="text-[12px] font-normal uppercase tracking-[0.34em] text-white/90">Process</p>
          <h2 className="mt-8 max-w-[820px] text-[34px] font-normal leading-[1.2] tracking-normal sm:text-[44px] lg:text-[50px] min-[1440px]:text-[54px]">
            A clear path from messy operations to dependable systems.
          </h2>
          <p className="mt-8 max-w-[610px] text-[14px] font-normal leading-[1.7] text-white/72 sm:text-[16px]">
            The implementation process stays structured, visible, and practical so teams can adopt better systems with
            confidence.
          </p>
        </div>

        <div className="grid w-full max-w-full grid-cols-1 gap-4 sm:gap-5 lg:block lg:h-[clamp(620px,63vw,736px)] lg:w-full">
          {processSteps.map((step) => (
            <ProcessCard key={step.number} step={step} className="lg:hidden" />
          ))}

          <div className="relative ml-auto hidden aspect-[624/816] h-full max-w-full lg:block">
            <img
              aria-hidden="true"
              src={processShape}
              alt=""
              className="block h-full w-full object-contain drop-shadow-[0_34px_100px_rgba(3,18,38,0.28)]"
            />
            <img
              aria-hidden="true"
              src={processShape}
              alt=""
              className="absolute inset-0 h-full w-full object-contain opacity-35 mix-blend-screen blur-[1px]"
            />
            {processSteps.map((step, index) => (
              <ProcessCard key={step.number} step={step} variant="desktop" className={stepPositions[index]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
