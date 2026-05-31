import { useState } from 'react'
import buttonShape from '@/assets/images/Button-Blue.svg'
import contactBg from '@/assets/images/contact-bg.jpg'

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

const SplitSubmitButton = ({
  children,
  isSubmitting = false,
  className = 'inline-block',
  widthClassName = 'w-full max-w-[224px] sm:w-[224px]',
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`group relative aspect-[253/49] max-w-full text-[14px] font-normal text-[#1d71c6] drop-shadow-[0_24px_50px_rgba(7,48,101,0.16)] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-70 ${widthClassName} ${className}`}
  >
    <img
      src={buttonShape}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:brightness-[0.98]"
    />

    <span className="absolute left-0 top-0 z-10 flex h-full w-[76%] items-center justify-center pb-[1px] capitalize leading-none">
      <span className="relative inline-block after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
        {isSubmitting ? 'Sending...' : children}
      </span>
    </span>

    <span className="absolute right-[2.8%] top-0 z-10 flex h-full w-[19.8%] items-center justify-center pb-[1px]">
      <ArrowUpRight className="size-5 transition-transform duration-300 ease-out group-hover:rotate-45" />
    </span>
  </button>
)

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

const handleSubmit = async (event) => {
  event.preventDefault()
  setIsSubmitting(true)
  setErrorMessage('')

  const form = event.currentTarget
  const formData = new FormData(form)

  const selectedSubject = formData.get('inquirySubject')

  formData.set('Inquiry Subject', selectedSubject)
  formData.set('_subject', `New ${selectedSubject} message from Noderno website`)

  try {
    const response = await fetch('https://formspree.io/f/xzdwwnoe', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }

    form.reset()
    setShowSuccessModal(true)
  } catch (error) {
    setErrorMessage('Something went wrong. Please try again or email us directly at support@noderno.dev.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <>
      <section
        id="contact"
        className="min-h-svh scroll-mt-[78px] bg-[#1C324C] px-[12px] pb-[12px] pt-0 lg:scroll-mt-[70px]"
      >
        <div className="mx-auto flex min-h-[calc(100svh-25px)] w-full max-w-[1704px] flex-col justify-center bg-[#1C324C] px-5 py-10 sm:px-9 sm:py-14 lg:px-16 lg:py-24 xl:px-[200px] xl:py-[118px]">
          <div className="mx-auto w-full max-w-[1450px] overflow-hidden rounded-[26px] bg-[#1C324C]/80 sm:rounded-[30px] min-[1440px]:rounded-[34px]">
            <div className="grid w-full max-w-[1450px] grid-cols-1 items-center gap-10 rounded-[26px] border border-white/18 bg-[radial-gradient(circle_at_34%_0%,rgba(255,255,255,0.18),rgba(255,255,255,0.075)_34%,rgba(255,255,255,0.055)_100%)] px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_0_80px_rgba(255,255,255,0.045),0_34px_100px_rgba(3,18,38,0.3)] backdrop-blur-xl sm:mt-10 sm:rounded-[30px] sm:px-8 sm:py-10 lg:mt-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16 min-[1440px]:max-w-[1500px] min-[1440px]:rounded-[34px]">
              <div className="flex flex-col items-start justify-center">
                <div className="max-w-[500px] text-white">
                  <p className="text-[11px] font-normal uppercase tracking-[0.32em] text-white">
                    GET IN TOUCH
                  </p>

                  <h2 className="mt-5 max-w-[620px] text-[30px] font-normal leading-[1.15] tracking-normal sm:text-[34px] lg:text-[38px] min-[1440px]:text-[42px]">
                    The best systems begin with the right conversation.
                  </h2>

                  <p className="mt-5 max-w-[420px] text-[14px] font-normal leading-[1.65] text-white sm:text-[15px]">
                    Bring the workflows, bottlenecks, and growth plans. We'll figure out the rest together.
                  </p>

                 
                </div>

                <div className="mt-8 w-full max-w-[500px] lg:max-w-[520px]">
                  <div className="relative aspect-[627/504] w-full overflow-hidden">
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute size-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <clipPath id="contact-bg" clipPathUnits="objectBoundingBox">
                          <path
                            transform="scale(0.0015948963 0.001984127)"
                            d="M627 467V37C627 16.5655 610.435 0 590 0H266.237C249.25 0 234.495 11.6876 230.606 28.224C226.717 44.7604 211.962 56.448 194.974 56.448H37C16.5654 56.448 0 73.0135 0 93.448V467C0 487.435 16.5655 504 37 504H590C610.435 504 627 487.435 627 467Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <img
                      src={contactBg}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 size-full object-cover"
                      style={{ clipPath: 'url(#contact-bg)' }}
                    />
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[540px] flex-col gap-8"
              >
                <input type="hidden" name="_subject" value="New message from Noderno website" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-[12px] font-medium uppercase tracking-wide text-white"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="text-normal rounded-lg border-[1px] border-white bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:bg-white/[0.08]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-[12px] font-medium uppercase tracking-wide text-white"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="text-normal rounded-lg border-[1px] border-white bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:bg-white/[0.08]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-[12px] font-medium uppercase tracking-wide text-white"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="text-normal rounded-lg border-[1px] border-white bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:bg-white/[0.08]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-[12px] font-medium uppercase tracking-wide text-white"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="text-normal rounded-lg border-[1px] border-white bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:bg-white/[0.08]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                <label
                  htmlFor="inquirySubject"
                  className="text-[12px] font-normal uppercase tracking-wide text-white"
                >
                  Subject
                </label>

                  <div className="relative">
                    <select
                      id="inquirySubject"
                      name="inquirySubject"
                      required
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none rounded-lg border border-white bg-white/5 px-3 py-2 pr-9 text-sm text-[#E8F2FF] outline-none transition focus:bg-white/[0.08]"
                    >
                      <option value="" disabled className="bg-[#1C324C]">
                        Select a subject
                      </option>
                      <option value="General Inquiry" className="bg-[#1C324C] font-normal">
                        General Inquiry
                      </option>
                      <option value="Project Collaboration" className="bg-[#1C324C] font-normal">
                        Project Collaboration
                      </option>
                      <option value="Support" className="bg-[#1C324C] font-normal">
                        Support
                      </option>
                      <option value="Other" className="bg-[#1C324C] font-normal">
                        Other
                      </option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#7BAFD4]"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[12px] font-medium uppercase tracking-wide text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="text-normal resize-none rounded-lg border-[1px] border-white bg-transparent px-3 py-2 text-sm leading-relaxed text-white outline-none transition focus:bg-white/[0.08]"
                  />
                </div>

                {errorMessage && (
                  <p className="text-sm leading-relaxed text-red-200">
                    {errorMessage}
                  </p>
                )}

                <BlueButton
                  isSubmitting={isSubmitting}
                  className="mt-1 w-full text-white"
                >
                  Send message
                </BlueButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#06182B]/70 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div className="w-full max-w-[420px] rounded-[24px] border border-white/20 bg-[#1C324C] p-6 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <p className="mx-auto flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl">
              ✓
            </p>

            <h3
              id="contact-success-title"
              className="mt-5 text-[24px] font-normal leading-tight"
            >
              Message sent successfully
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Thanks for reaching out. We received your message and will get back to you soon.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 rounded-full border border-white px-6 py-2 text-sm text-white transition hover:bg-white hover:text-[#1C324C]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact