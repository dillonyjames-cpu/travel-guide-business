import { useState, type FormEvent } from "react";
import { currentTour } from "../data/tours";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const field =
  "mt-2 w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-smoke/50 focus:border-bronze focus:outline-none focus:ring-0";

/**
 * Inquiry form. It is not connected to an inbox yet, so submitting says so
 * plainly instead of pretending the message went anywhere.
 */
export function InquirySection() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquire" className="scroll-mt-24 bg-paper py-24 md:py-36" aria-labelledby="inquire-heading">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <SectionLabel>Inquire</SectionLabel>
          <h2 id="inquire-heading" className="display-xl mt-7 text-[clamp(2.4rem,5vw,4.25rem)] text-charcoal">
            Join the <em className="italic text-bronze">Journey</em>
          </h2>
          <p className="body-lg mt-8 text-smoke">
            Places on the {currentTour.name} are limited. Tell us a little about who is travelling and we will
            reply with availability and the full details for {currentTour.dateRange}.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" noValidate={false}>
            <label className="label-sm text-smoke" htmlFor="inquiry-name">
              Full name
              <input id="inquiry-name" name="name" required autoComplete="name" className={field} />
            </label>
            <label className="label-sm text-smoke" htmlFor="inquiry-email">
              Email
              <input id="inquiry-email" name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="label-sm text-smoke" htmlFor="inquiry-travellers">
              Travellers
              <select id="inquiry-travellers" name="travellers" defaultValue="2" className={field}>
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="label-sm text-smoke" htmlFor="inquiry-tour">
              Journey
              <input id="inquiry-tour" name="tour" readOnly value={currentTour.name} className={field} />
            </label>
            <label className="label-sm text-smoke sm:col-span-2" htmlFor="inquiry-message">
              Message
              <textarea
                id="inquiry-message"
                name="message"
                rows={4}
                placeholder="Questions, dietary needs, rooming preferences…"
                className={`${field} resize-none`}
              />
            </label>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="label inline-flex items-center justify-center bg-forest-deep px-8 py-4 text-ivory transition-colors duration-300 hover:bg-bronze"
              >
                Send inquiry
              </button>
              {submitted && (
                <p role="status" className="max-w-xs text-sm text-bronze">
                  Online inquiries open soon. This form doesn't send messages yet.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
