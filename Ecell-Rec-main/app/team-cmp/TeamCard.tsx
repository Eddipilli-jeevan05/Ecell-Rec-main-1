"use client";
import React from 'react';
import Image from 'next/image';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  role: string;
  name: string;
  socialLinks: { platform: string; url: string }[];
  imageUrl: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  role,
  name,
  socialLinks,
  imageUrl
}) => {
  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return '/icons/twitter-x-icon.jpg';
      case 'linkedin':
        return '/icons/in.png';
      default:
        return '';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}    //Set Image Here
          alt={name}            //Set Image name Here
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.infoOverlay}>
        <h3 className={styles.name}>{name}</h3>     {/* Set Name Here  */}
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => {
            const iconUrl = getIconForPlatform(link.platform);
            if (!iconUrl) return null;
            return (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">    
                <Image
                  src={iconUrl}
                  alt={link.platform}
                  width={24}
                  height={24}
                  className='rounded-md'
                />
              </a>
            );
          })}
        </div>
      </div>
      <div className={styles.role}>{role}</div>   {/* Set the role Here */}
    </div>
  );
};

export default TeamCard;
