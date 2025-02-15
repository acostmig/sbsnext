'use client';

import React from 'react';
import servicesData from './servicesData.json';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

const ServicesPage = () => {
  const section0Ref = React.useRef<HTMLElement>(null);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] mx-5">
      <header className="text-center min-h-screen flex flex-col items-center relative">
        <h2 className="text-sm pt-32 font-semibold tracking-widest uppercase text-[var(--color-primary)] ">
          Our Expertise
        </h2>
        <p className="mt-4 text-5xl font-extrabold">Engineering the Future</p>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          We craft solutions that push boundaries, combining deep expertise, strategic thinking, and innovation to drive lasting impact.
        </p>
        {/* Arrow Down Button */}
          <button
            onClick={() => section0Ref.current?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-10 right-10 p-3 cta-button flex items-center justify-center animate-bounce shadow-lg"
          >
            <ArrowDownIcon className="h-6 w-6" />
          </button>
      </header>
      <div>
        {servicesData.map(({ id, title, description, content }, index) => (
          <section
            key={index}
            id= {id}
            ref={index === 0 ? section0Ref : null}
            className="relative px-6 lg:px-12 flex flex-col items-center text-center py-20"
          >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[var(--background)] bg-opacity-60"></div>

            <div className="relative max-w-4xl mx-auto">
              <h3 className="text-4xl font-semibold mb-2">{title}</h3>
              <p className="text-lg mb-10">{description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.map(({ title, text, id, cta }, contentIndex) => (
                  <div key={contentIndex} className="relative p-6 border border-[var(--color-primary)] rounded-lg text-left flex flex-col justify-between">
                    {/* Case Study Label */}
                    {id === "chatbot" || id === "automation" ? (
                      <div className="absolute top-2 right-2 text-sm font-semibold opacity-40">
                        Case Study
                      </div>
                    ) : null}

                    <div>
                      <h4 className="text-2xl font-semibold text-[var(--color-primary)] mt-3 min-h-15">{title}</h4>
                      <p className="mt-2">{text}</p>
                    </div>

                    {/* Try it Out CTA */}
                    <CTA id={id} input={cta}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Divider */}
            {index !== servicesData.length - 1 && (
              <div className="relative w-full flex justify-center py-10">
                <div className="w-32 h-1 bg-[var(--color-primary)] rounded-full"></div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="text-center py-16">
        <h3 className="text-2xl font-bold">Let's Build Something Extraordinary</h3>
        <p className="mt-2">Contact us to discuss your project and see how we can help.</p>
        <div className="mt-6">
          <a href="mailto:info@sbsnext.com" className="cta-button">
            Get in Touch
          </a>
        </div>
      </footer>
    </main>
  );
};


const CTA = ({ id, input } : {id?:string, input?:string}) => {
  if (input) {
    if(input==="indev")
    {
      return (
        <div className="mt-4 w-auto inline-block">
         <UnderConstruction/>
        </div>
      )
    }
    return (
      <div className="mt-4 w-auto inline-block">
        <a href={"/" + id} className="cta-button">
          {input}&rarr;
        </a>
      </div>
    );
  }
  return null;
};

function UnderConstruction() {
  return (
    <div className="flex items-center justify-center w">
      {/* Rope */}
      <div className="relative flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gray-700 animate-rope-swing"></div>

        {/* Hanging sign */}
        <div className="relative">
          <div className="bg-yellow-500 border-2 border-black rounded-md flex items-center justify-center 
                          text-black font-bold text-sm shadow-xl transform origin-top animate-swing">
            UNDER CONSTRUCTION
            <ClockIcon className="px-2 h-4"/>

          </div>

        </div>
      </div>
      
    </div>
  );
}


export default ServicesPage;
