"use client";
import TeamRender from './TeamRender';
import { motion } from "framer-motion";

type TeamContainerProp = {
  TeamContainer: "CurrentTeam" | "FormerTeam";
}


export default function Team({ TeamContainer }: TeamContainerProp) {
  return (

    <motion.div
      className="w-full relative overflow-hidden bg-[#f1f4f9]"
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-full relative overflow-hidden py-10 px-4 bg-[#f1f4f9]">

        <TeamRender TeamContainer={TeamContainer} />
      </div>
    </motion.div>

  );
}
