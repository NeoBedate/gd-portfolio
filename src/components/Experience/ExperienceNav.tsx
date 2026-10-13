'use client';

import React, { useEffect, useState } from 'react';

const sections = [
  { name: 'Resume', id: 'resume' },
  { name: 'Education', id: 'education' },
  { name: 'Skills', id: 'skills' },
  { name: 'Courses', id: 'courses' },
  { name: 'References', id: 'references' },
];

const ExperienceNav: React.FC = () => {
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
          {section.name}
        </a>
      ))}
    </nav>
  );
};

export default ExperienceNav;
