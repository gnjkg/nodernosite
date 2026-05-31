const ArrowUpRight = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 18 18" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.25 12.75 12.75 5.25M6.75 5.25h6v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
  </svg>
)

const ServiceCard = ({ service }) => {
  const { title, description, image, icon, tags = [], badge } = service

  return (
    <article className="group relative flex aspect-[0.918/1] min-h-[300px] overflow-hidden rounded-[14px] text-white shadow-[0_24px_64px_rgba(3,22,48,0.2)] transition-[flex,transform,box-shadow] duration-500 ease-out hover:shadow-[0_34px_90px_rgba(3,22,48,0.34)] sm:min-h-[330px] lg:h-[386px] lg:min-h-0 lg:flex-[1_1_0] lg:hover:flex-[1.34_1_0] min-[1440px]:!h-[414px] min-[1440px]:!min-h-[414px] min-[1440px]:!max-h-[414px]">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#072f60]/10 via-transparent to-[#062b50]/10" />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6 min-[1440px]:px-[25px]">
        <div className="flex items-start justify-between gap-4">
          <img src={icon} alt="" aria-hidden="true" className="size-5 shrink-0" />

          {badge ? (
            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[13px] font-normal leading-none text-white/90 backdrop-blur-md">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="mt-16 max-w-[255px] sm:mt-[76px] sm:max-w-[280px] lg:mt-[86px] lg:max-w-[235px] min-[1440px]:mt-[89px] min-[1440px]:min-h-[132px] min-[1440px]:!max-w-[400px]">
          <h3 className="text-[16px] font-normal leading-tight sm:text-[16px] min-[1440px]:!text-[16px]">{title}</h3>
          <p className="mt-[14px] text-[14px] font-normal leading-[1.45] text-white sm:text-[14px] min-[1440px]:!text-[14px]">{description}</p>
        </div>

        <div className="mt-2 flex max-h-20 flex-wrap gap-2 overflow-hidden opacity-100 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:opacity-100">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#1C324C]/40 px-3 py-2 text-[12px] font-normal leading-none text-white/90 backdrop-blur-md">
              {tag}
            </span>
          ))}
        </div>

        <ArrowUpRight className="mt-auto size-5 text-white transition-transform duration-300 ease-out group-hover:-rotate-[-45deg]" />
      </div>
    </article>
  )
}

export default ServiceCard
