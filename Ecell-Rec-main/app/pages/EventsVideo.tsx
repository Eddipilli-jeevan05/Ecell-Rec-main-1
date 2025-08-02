import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export default function EventsVideo() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/rxVtQispBOY?si=WmFhBH10iYY0E7cf"
        thumbnailSrc="https://i.ibb.co/hcH066Q/youtube-Thumbnail.jpg"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/rxVtQispBOY?si=WmFhBH10iYY0E7cf"
        thumbnailSrc="https://i.ibb.co/hcH066Q/youtube-Thumbnail.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
