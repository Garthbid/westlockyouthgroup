import Link from "next/link";
import { HeartDoodle } from "./Doodles";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

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
        <p className="text-center text-[13px] text-navy/80">
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

      <div className="flex items-center gap-4">
        <Link href="#" aria-label="Instagram" className="transition-opacity duration-200 hover:opacity-60">
          <InstagramIcon className="h-5 w-5" />
        </Link>
        <Link href="#" aria-label="Snapchat" className="transition-opacity duration-200 hover:opacity-60">
          <SnapchatIcon className="h-5 w-5" />
        </Link>
        <Link href="#" aria-label="YouTube" className="transition-opacity duration-200 hover:opacity-60">
          <YoutubeIcon className="h-[22px] w-[22px]" />
        </Link>
      </div>
    </footer>
  );
}
