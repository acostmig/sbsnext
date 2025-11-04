"use client"
import { CodeBracketSquareIcon, WrenchScrewdriverIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import ContactUs from "./contact-us";
import Link from "next/link";

export const Services = [

  {
    id: 2,
    title: "Artificial Inteligence",
    description: "Building custom AI solutions tailored to your business needs using vector databases to consume your data. From intelligent chatbots and knowledge bases to automated workflows and decision-support tools—whatever your organization requires to leverage AI effectively.",
    icon: LightBulbIcon,
  },
  {
    id: 3,
    title: "Test Automation Engineering",
    description: "Designing reliable automation processes and building custom tools to create stable, low-maintenance tests that teams can trust. These solutions seamlessly integrate into development workflows, ensuring confidence in test results and enabling strong quality control between releases.",
    icon: WrenchScrewdriverIcon,
  },
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Designing and building custom software solutions to address unique business challenges, leveraging modern technologies to deliver scalable, high-performance applications.",
    icon: CodeBracketSquareIcon,
  }
];

type HeroProps = {
  className?: string;
};


export default function Hero({ className }: HeroProps) {
  return (
    <div className={className} >
      <div className="relative isolate px-6 pt-10 lg:px-8 fill-y">

        {/* background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-vissible blur-3xl sm:-top-80"
        >
          <div
            className="clipped-shape relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] 
           -translate-x-1/2 rotate-[30deg] 
           bg-linear-to-tr from-[#ff80b5] to-[#9089fc] 
           opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>


        <div className=" fill-y">

          {/* chatbot */}
          <div className="hidden sm:flex sm:justify-center sm:items-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Talk to our bot and discover who we are and what we do. {' '}
              <Link href="/chat" className="font-semibold text-cta">
                <span aria-hidden="true" className="absolute inset-0" />
                Start Chatting <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <section className="max-w-6xl mx-auto text-center px-4 fill-y py-3">
            <div className="flex-grow flex justify-center items-center py-3">
              <h1 className="text-4xl font-bold opacity-80">
                What We Do Best
              </h1>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {Services.map(({ id, title, description, icon: Icon }) => (
                <div key={id} className="px-6 py-3 sm:py-10 shadow-lg rounded-2xl border flex flex-col items-center">
                  <Icon className="h-8 w-8 sm:h-8 sm:w-8 opacity-80 mb-4" />
                  <h3 className="text-2xl font-semibold opacity-80 mb-2 min-h-18">{title}</h3>
                  <span className="opacity-55">
                    {description}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-x-6 flex-grow py-5">
              <ContactUs>
                <button
                  className="cta-button shadow-sx"
                >
                  Let&apos;s Talk
                </button>
              </ContactUs>
              <a href="/services" className="font-semibold">
                Discover our Approach <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>


        </div>

      </div>
    </div>
  );
}