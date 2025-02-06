"use client"
import { CodeBracketSquareIcon, BeakerIcon, WrenchScrewdriverIcon, LightBulbIcon } from "@heroicons/react/24/solid";

export const Services = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Designing and building custom software solutions to address unique business challenges, leveraging modern technologies to deliver scalable, high-performance applications.",
    icon: CodeBracketSquareIcon,
  },
  {
    id: 2,
    title: "Artificial Inteligence",
    description: "Leveraging AI/ML SDKs to create solutions like chatbots, code generators, and decision-making tools that boost innovation and business efficiency.",
    icon: LightBulbIcon,
  },
  {
    id: 3,
    title: "Automation Tool Development",
    description: "Developing customized testing solutions and automation tools to meet unique client requirements and enhance operational efficiency.",
    icon: WrenchScrewdriverIcon,
  },
];

type HeroProps={
  className?:string;
};

export default function Hero({className}: HeroProps){
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
           opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>


        <div className=" fill-y">

          {/* chatbot */}
          <div className="hidden sm:flex sm:justify-center sm:items-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Talk to our bot and discover who we are. {' '}
              <a href="#" className="font-semibold text-cta">
                <span aria-hidden="true" className="absolute inset-0" />
                Start Chatting <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <section className="max-w-6xl mx-auto text-center px-4 fill-y">
            <div className="flex-grow flex justify-center items-center">
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
            <div className="mt-8 flex items-center justify-center gap-x-6 flex-grow">
              <a
                href="#"
                className="cta-button shadow-sx"
              >
                Let's Talk
              </a>
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