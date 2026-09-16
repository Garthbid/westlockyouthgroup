import { HeartDoodle } from "./Doodles";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto flex max-w-[1210px] flex-col items-center gap-6 px-6 pb-12 pt-16 sm:flex-row sm:gap-0 lg:px-8"
    >
      <div className="font-script text-[20px] font-semibold leading-[1.05]">
        <span className="block rotate-[-6deg]">Better</span>
        <span className="block rotate-[-6deg] pl-3">Together</span>
        <HeartDoodle className="ml-6 mt-0.5 h-3.5 w-3.5 rotate-[-6deg]" strokeWidth={3.5} />
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 px-4 sm:px-10">
        <div className="flex w-full items-center gap-5">
          <span className="hidden h-px flex-1 bg-navy/20 sm:block" />
          <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-navy/70">
            &ldquo;KIND PEOPLE ARE OUR KIND OF PEOPLE.&rdquo;
          </p>
          <span className="hidden h-px flex-1 bg-navy/20 sm:block" />
        </div>
        <p className="text-center text-[16px] font-semibold text-navy/90">
          Call Justin @{" "}
          <a
            href="tel:+17803076510"
            className="font-bold underline underline-offset-2 transition-colors duration-200 hover:text-navy"
          >
            780-307-6510
          </a>{" "}
          for any questions about the youth group or the website.
        </p>
      </div>
    </footer>
  );
}
