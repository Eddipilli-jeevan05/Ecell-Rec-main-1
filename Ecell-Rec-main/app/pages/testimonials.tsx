import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Dr. R.Shivaranjani",
    username: "Head of the department CSC&CSO",
    body: "The focus on innovation inspired individual to think beyond traditional approaches and create solutions that effectively address real-world needs. This experience not only enhanced their perspective but also helped them to grow into a more confident and resourceful individual.",
    img: "/hodmam.jpg",
  },
  {
    name: "Dr.G.Kiran Kumar",
    username: "Faculty coordinator E-CELL REC",
    body: "The impact you've made in nurturing creativity, building confidence, and turning ideas into actionable plans is remarkable. Kudos to the entire team for consistently going above and beyond to make a difference. Here's to many more milestones and success stories ahead! Keep inspiring and leading the way!",
    img: "/kirankumar.png",
  },
  {
    name: "Mr. Seshadri Kancherla",
    username: "IIC: Innovation Ambassador (IA)",
    body: "E-Cell inspire students to launch their own enterprises and foster an entrepreneurial culture. Additionally, they assist students in transforming their concepts into profitable enterprises.",
    img: "/mechsir.jpg",
  },
  {
    name: "Dr. Bhagavathula Meena ",
    username: "Associate Professor & SBC - CSI",
    body: "Young individuals are capable of innovating, sharing ideas, seeking for challenges, and benefiting from their Peer experiences. I am confident that the resources offered by E-Cell REC will help the students to succeed in their carreer and establish a strong professional network.",
    img: "/meena-madam.png",
  },
  {
    name: "Mr.E.Pavan Chandra ",
    username: "CEO, XceedIQ",
    body: "As an alumnus, it was an absolute privilege to visit my college as a guest. It's amazing to see how much support and encouragement the students have now. Great work by E-Cell REC, and I'm excited to see the incredible things the students will achieve!",
    img: "/pavanchandrasir.jpg",
  },
  {
    name: "Bora Suri Venkata Reddy",
    username: "CSE Dept Assistant Professor and  NSS Programme Officer",
    body: "At E-Cell, we believe every idea has the potential to change the world. Here, innovation meets opportunity, and together, we empower the entrepreneurs of tomorrow. Dream big, take risks, and let's build the future",
    img: "/kirannsssir.jpg",
  },
  {
    name: "Dr. Ch.Chakradhar",
    username: "CSE Dept IIC coordinator",
    body: "E-Cell helps students in the development of their entrepreneurial skills, connecting the people with similar or different ideology, and access resources to start their business",
    img: "/chakradharsir.jpg",
  },
  {
    name: "N. Venkata Reddy",
    username: "Founder - CEO, Teckybot",
    body: "The E-Cell's dedication to fostering entrepreneurship and providing a platform for students to explore creative and impactful ideas is commendable. Their initiative to connect students with real-world experiences and industry experts is a testament to their commitment to shaping future leaders and innovators.",
    img: "/teckybotsir.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-96 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full w-10 h-10 object-cover" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-justify">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden">
      <h1 className="text-3xl flex md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 justify-center">Testimonials</h1>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
