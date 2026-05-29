import ServiceCard from '@/components/ui/ServiceCard'
import customSoftwareImage from '@/assets/images/custom-software-dev-bg.jpg'
import designImage from '@/assets/images/design-bg.png'
import digitalMarketingImage from '@/assets/images/digital-marketing-bg.jpg'
import chipIcon from '@/assets/icons/icon-chip.svg'
import codeIcon from '@/assets/icons/icon-code.svg'
import designIcon from '@/assets/icons/icon-design.svg'
import marketingIcon from '@/assets/icons/icon-marketing.svg'
import iotImage from '@/assets/images/iot-bg.jpg'

const services = [
  {
    title: 'Custom Software Development',
    description:
      'Internal platforms, dashboards, booking systems, inventory tools, reporting systems, and business applications built around how your team actually works.',
    image: customSoftwareImage,
    icon: codeIcon,
    tags: ['Web Development', 'Mobile Apps', 'Dashboards', 'APIs'],
  },
  {
    title: 'IoT & Smart Monitoring',
    description:
      'Smart sensors, live dashboards, automated alerts, and connected systems that help monitor operations, assets, and environments in real time.',
    image: iotImage,
    icon: chipIcon,
    tags: ['Sensors', 'Real-time Alerts', 'Remote Monitoring'],
  },
  {
    title: 'Digital Marketing',
    description:
      'SEO, content creation, paid ads, social media management, and marketing strategies designed to help your brand grow online.',
    image: digitalMarketingImage,
    icon: marketingIcon,
    badge: 'Beta',
    tags: ['SEO', 'Social Media', 'Email Marketing'],
  },
  {
    title: 'Design',
    description:
      'UI/UX design, branding, logos, websites, graphics, and visual assets crafted to create clean, modern, and user-friendly experiences.',
    image: designImage,
    icon: designIcon,
    tags: ['UI/UX Design', 'Brand Identity', 'Wirefrimes'],
  },
]

const Services = () => {
  return (
    <section id="services" className="min-h-svh scroll-mt-[78px] lg:scroll-mt-[70px] bg-[#1C324C] px-[12px] pb-[12px] pt-[12px]">
      <div className="mx-auto flex min-h-[calc(100svh-25px)] w-full max-w-[1704px] flex-col justify-center bg-[#1C324C] px-5 py-14 sm:px-9 sm:py-18 lg:px-16 lg:py-24 xl:px-[200px] xl:py-[122px]">
        <div className="mx-auto mb-10 max-w-[690px] text-center text-white sm:mb-14 lg:mb-[72px]">
          <p className="text-[11px] font-normal uppercase tracking-[0.34em] text-white">Services</p>
          <h2 className="mx-auto mt-6 max-w-[640px] text-[34px] font-normal leading-[1.12] tracking-normal sm:text-[42px] lg:text-[50px]">
            Modern systems for real-world operations.
          </h2>
          <p className="mx-auto mt-6 max-w-[540px] text-[13px] font-normal leading-[1.55] text-white/75 sm:text-[16px]">
           Every Business has workflows worth improving. We build systems that solve the operational problems behind them.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1224px] gap-4 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-3 min-[1440px]:h-[414px] min-[1440px]:max-w-none">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
