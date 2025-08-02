"use client";
import CurrentTeamMembers from './CurrentTeamData';
import FormerTeamMembers from './FormerTeamData';
import TeamCard from './TeamCard';
import { motion } from "framer-motion";
type TeamContainerProp = {
    TeamContainer: "CurrentTeam" | "FormerTeam";
}
const TeamRender = ({ TeamContainer }: TeamContainerProp) => {
    const TeamData = TeamContainer === "CurrentTeam" ? CurrentTeamMembers : FormerTeamMembers
    return (


        <motion.div
            className="w-full px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                    },
                },
            }}
        >
            {/* Animated Heading */}
            <motion.h1
                className="text-4xl font-bold text-blue-900 underline decoration-blue-300 decoration-2 underline-offset-4 mb-10 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {TeamContainer === "CurrentTeam" ? "Our Team" : "Former Team"}
            </motion.h1>

            <div className="flex flex-wrap justify-center sm:gap-20 gap-6">
                {TeamData.map((member, index) => (

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    >

                        <TeamCard
                            key={index}
                            role={member.role}
                            name={member.name}
                            socialLinks={member.socialLinks}
                            imageUrl={member.imageUrl}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default TeamRender;
