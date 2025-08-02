import React from "react";
import BoxReveal from "@/components/ui/box-reveal";
import ShineBorder from "@/components/ui/shine-border";

export function Vision() {
  return (
    <div className="flex items-center justify-center min-h-[600px] w-full bg-gradient-to-b from-mylavender to-transparent to-90% dark:from-black py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {/* AIM Box */}
          <ShineBorder
            className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background p-8 md:shadow-xl"
            color={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
          >
            {(
              <>
                <BoxReveal boxColor={"#FF6B6B"} duration={0.5}>
                  {(
                    <p className="text-[2.5rem] font-semibold text-center">
                      Our Aim<span className="text-[#FF6B6B]">.</span>
                    </p>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#FF6B6B"} duration={0.5}>
                  {(
                    <h2 className="mt-4 text-[1rem] text-center">
                      <span className="text-[#FF6B6B]">Innovation</span> & <span className="text-[#FF6B6B]">Excellence</span>
                    </h2>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#FF6B6B"} duration={0.5}>
                  {(
                    <div className="mt-6 text-center">
                      <p className="text-sm leading-relaxed">
                        To foster a culture of innovation and excellence, 
                        providing students with the knowledge, skills, and 
                        mindset needed to become successful entrepreneurs 
                        and business leaders.
                      </p>
                    </div>
                  )}
                </BoxReveal>
              </>
            )}
          </ShineBorder>

          {/* VISION Box */}
          <ShineBorder
            className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background p-8 md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            {(
              <>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  {(
                    <p className="text-[2.5rem] font-semibold text-center">
                      Our Vision<span className="text-[#5046e6]">.</span>
                    </p>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  {(
                    <h2 className="mt-4 text-[1rem] text-center">
                      Students to <span className="text-[#5046e6]">Entrepreneurs</span>
                    </h2>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  {(
                    <div className="mt-6 text-center">
                      <p className="text-sm leading-relaxed">
                        To ignite and nurture entrepreneurial spirit
                        among students, empowering them to innovate, create, and lead
                        impactful ventures that contribute to economic growth and societal
                        progress.
                      </p>
                    </div>
                  )}
                </BoxReveal>
              </>
            )}
          </ShineBorder>

          {/* GOAL Box */}
          <ShineBorder
            className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background p-8 md:shadow-xl md:col-span-2 lg:col-span-1"
            color={["#2ECC71", "#F39C12", "#E74C3C"]}
          >
            {(
              <>
                <BoxReveal boxColor={"#2ECC71"} duration={0.5}>
                  {(
                    <p className="text-[2.5rem] font-semibold text-center">
                      Our Goal<span className="text-[#2ECC71]">.</span>
                    </p>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#2ECC71"} duration={0.5}>
                  {(
                    <h2 className="mt-4 text-[1rem] text-center">
                      <span className="text-[#2ECC71]">Success</span> & <span className="text-[#2ECC71]">Impact</span>
                    </h2>
                  )}
                </BoxReveal>

                <BoxReveal boxColor={"#2ECC71"} duration={0.5}>
                  {(
                    <div className="mt-6 text-center">
                      <p className="text-sm leading-relaxed">
                        To create a thriving ecosystem where students can 
                        transform their ideas into successful businesses, 
                        contributing to the nation&apos;s economic development 
                        and creating positive social impact.
                      </p>
                    </div>
                  )}
                </BoxReveal>
              </>
            )}
          </ShineBorder>

        </div>
      </div>
    </div>
  );
}
