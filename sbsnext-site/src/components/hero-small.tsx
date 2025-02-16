"use client"
import { Services } from "./hero";
import ContactUs from "./contact-us";
import Link from "next/link";


type HeroProps = {
  className?: string;
};

export default function HeroSmall({ className }: HeroProps) {
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
           opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>


        <div className="mx-auto max-w-4xl fill-y">

          {/* chatbot */}


          <section className="mx-auto min-h-screen flex flex-col justify-between">
            <div className="flex justify-center items-center pt-50">
              <div className="relative  px-8 py-5 text-4xl">
                <span className="opacity-60">
                  Have questions? Our chatbot has answers! {' '} <br/>
                </span>
                <Link href="/chat" className="font-bold text-primary underline">
                  <span aria-hidden="true" className="inset-0" />
                  Start Chatting 
                </Link>
                <span aria-hidden="true" className="text-primary">&rarr;</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-6 flex-grow">
              <ContactUs>
                <button className="cta-button">
                  Contact Us
                </button>
              </ContactUs>
              <a href="/services" className="font-semibold">
                Discover our Approach <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>

          <section className="">

            <div className="flex-grow flex justify-center items-center py-5">
              <h1 className="text-4xl font-bold opacity-80">
                What We Do Best
              </h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8 py-10">
              {Services.map(({ id, title, description, icon: Icon }) => (
                <div key={id} className="px-6 py-3 sm:py-10 shadow-lg rounded-2xl border flex flex-col items-center">
                  <Icon className="h-8 w-8 sm:h-8 sm:w-8 opacity-80 mb-4" />
                  <h3 className="text-lg font-semibold opacity-80 mb-2">{title}</h3>
                  <span className="opacity-55">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </section>


        </div>

      </div>
    </div>
  );
}