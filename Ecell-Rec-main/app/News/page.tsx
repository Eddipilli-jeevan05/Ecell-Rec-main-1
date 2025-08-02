import RetroGrid from "@/components/ui/retro-grid";
import CloseBtn from "@/app/News/close.svg";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  title: string;
  description: string;
  linkUrl: string;
  type: "announcement" | "important" | "update";
};

const newsData: NewsItem[] = [
  {
    title: "New Beginnings at E-Cell REC: Team Inauguration & Launch of 'Ideation to Startup'",
    description: "E-Cell REC kicks off 2025 with the inauguration of its new core team and the launch of 'Ideation to Startup', a flagship initiative to help students transform ideas into real ventures through guided mentorship and workshops.",
    linkUrl: "",
    type: "announcement",
  },
  {
    title: "E-Summit dates announced",
    description: "E-SUMMIT'25 REC happening in 1st and 2nd March 2025.",
    linkUrl: "",
    type: "update",
  },
  {
    title: "E-Summit website launched",
    description: "E-SUMMIT'25 REC website is now live. Check it out now.",
    linkUrl: "https://esummit-rec.vercel.app/",
    type: "important",
  }
];

const News: React.FC = () => {
  const typeStyles = {
    announcement: "bg-green-200 text-green-700",
    important: "bg-red-200 text-red-700",
    update: "bg-blue-200 text-blue-700",
  };

  return (
    <>
      <Link href="/" passHref>
        <div className="fixed right-0 top-0 z-10 p-4 cursor-pointer">
          <Image src={CloseBtn} width={30} height={30} alt="close" />
        </div>
      </Link>
      <div className="flex flex-col items-center p-4 space-y-4">
        <div className="text-xl font-bold bg-yellow-100 text-center px-4 py-2 shadow-md rounded-lg tracking-wide">
          News Section
        </div>
        {newsData.map((news, index) => (
          <div
            key={index}
            className="w-full max-w-xl p-4 border rounded-lg shadow-md bg-purple-300 relative cursor-pointer"
          >
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full ${
                typeStyles[news.type]
              }`}
            >
              {news.type}
            </span>
            <h2 className="text-lg font-semibold">{news.title}</h2>
            <p className="text-gray-600">{news.description}</p>
            { 
              news.linkUrl === "" ? null : 
              <a href={news.linkUrl}>Link To Page</a>
            }
          </div>
        ))}
        <RetroGrid />
      </div>
    </>
  );
};

export default News;
