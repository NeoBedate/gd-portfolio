'use client';

import React, { useEffect, useState } from 'react';

import { t } from '@/data/i18n/ui';
import type { Lang } from '@/lib/i18n';

const sections = [
  { key: 'skills', id: 'skills' },
  { key: 'resume', id: 'resume' },
  { key: 'education', id: 'education' },
  { key: 'courses', id: 'courses' },
] as const;

const ExperienceNav: React.FC<{ lang?: Lang }> = ({ lang = 'en' }) => {
  const [activeSection, setActiveSection] = useState('resume');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="experience-nav">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`experience-nav-link ${activeSection === section.id ? 'active' : ''}`}
        >
          {t(lang).experience[section.key]}
        </a>
      ))}
    </nav>
  );
};

export default ExperienceNav;
