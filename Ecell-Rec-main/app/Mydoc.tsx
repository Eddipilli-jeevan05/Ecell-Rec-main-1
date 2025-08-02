import React from "react";
import Link from "next/link";
import { CalendarIcon, HomeIcon, MailIcon, Star, Users, BookText, Crown, Rocket, Eye, InfoIcon, AlarmClock, Newspaper } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/app/dock-cmp/Separator";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/app/dock-cmp/Tooltip";
// import { ModeToggle } from "@/app/dock-cmp/mode-toggle";
import { Dock, DockIcon } from "@/components/ui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      {/* LinkedIn Path */}
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>GitHub</title>
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.125-.305-.535-1.54.115-3.205 0 0 1.005-.32 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.655 1.665.245 2.9.12 3.205.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.1.81 2.22v3.285c0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  ),
  testimonial: (props: IconProps) => (<Star {...props} />),
  teams: (props: IconProps) => (<Users {...props} />),
  resources: (props: IconProps) => (<BookText {...props} />),
  events: (props: IconProps) => (<AlarmClock {...props} />),
  mission: (props: IconProps) => (<Rocket {...props} />),
  vision: (props: IconProps) => (<Eye {...props} />),
  about: (props: IconProps) => (<InfoIcon {...props} />),
  formerTeam: (props: IconProps) => (<Crown {...props} />),
  news: (props: IconProps) => (<Newspaper {...props} />),
  // Additional icons ...
};

const DATA = {
  navbar: [
    { href: "#myhome", icon: HomeIcon, label: "home" },
    { href: "#vision", icon: Icons.vision  , label: "Vision" },
    { href: "#mission", icon: Icons.mission, label: "Mission" },
  ],
  contact: {
    social: {
      Events: { name: "Events", url: "#events", icon: Icons.events },
      Resources: { name: "Resources", url: "#resources", icon: Icons.resources },
      Calendar: { name: "Events Calendar", url: "/calendar", icon: Icons.calendar }
    },
    other: {
      Team: { name: "Team", url: "#team", icon: Icons.teams },
      Testimonials: { name: "Testimonials", url: "#Testimonials", icon: Icons.testimonial },
      About: {name:"Advisory Board", url:"/about", icon: Icons.about },
      FormerTeam: {name: "Former Team", url: "/former-team", icon: Icons.formerTeam}
    },
  },
};

export default function DockDemo() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden">
      <TooltipProvider>
        <Dock direction="middle" className="w-fit max-w-[95vw] items-center justify-center mx-auto px-2 gap-1 sm:gap-2">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 sm:size-12 rounded-full",
                    )}
                  >
                    <item.icon className="size-3 sm:size-4" />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical"/>
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 sm:size-12 rounded-full",
                    )}
                  >
                    <social.icon className="size-3 sm:size-4" />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" />
          {Object.entries(DATA.contact.other).map(([name, other]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={other.url}
                    aria-label={other.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-10 sm:size-12 rounded-full",
                    )}
                  >
                    <other.icon className="size-3 sm:size-4" />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </DockIcon>
          ))}
          {/* <Separator orientation="vertical"/>
          <DockIcon>
            
                <ModeToggle className="rounded-full" />
              
          </DockIcon> */}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
