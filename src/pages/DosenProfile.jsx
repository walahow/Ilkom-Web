import React, { useState } from 'react';
import {
    FaGraduationCap,
    FaFlask,
    FaQuoteLeft,
    FaEnvelope,
    FaGlobe,
    FaLinkedin,
    FaBook,
} from 'react-icons/fa';

const lecturers = [
    {
        id: 1,
        name: 'Dr. Hermawan Syahputra, M.Si.',
        role: 'Dosen Tetap • Pakar Kecerdasan Buatan',
        avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&w=256&q=80',
        tags: ['AI', 'Data Science', 'Python'],
        education: ['S3 Informatika – ITB', 'S2 Ilmu Komputer – UI', 'S1 Teknik Informatika – UGM'],
        research: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
        bio: 'Dr. Hermawan Syahputra, M.Si. memiliki pengalaman mengajar lebih dari 10 tahun. Beliau aktif mempublikasikan jurnal internasional bereputasi dan menjadi pembicara dalam konferensi teknologi.',
        contacts: [
            { type: 'email', href: 'mailto:budi@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'scholar', href: '#', icon: <FaBook /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 2,
        name: 'Dr. Sari Rahman, M.Sc',
        role: 'Koordinator Riset • Keamanan Siber',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=256&q=80',
        tags: ['Cyber Security', 'Network', 'Digital Forensic'],
        education: ['Ph.D Cyber Security – NUS', 'M.Sc Information Security – ITB', 'S1 Sistem Informasi – UNS'],
        research: ['Threat Intelligence', 'IoT Security', 'Privacy Engineering'],
        bio: 'Fokus Dr. Sari adalah membangun ekosistem keamanan digital kampus dan menggandeng industri untuk proyek penelitian terapan.',
        contacts: [
            { type: 'email', href: 'mailto:sari@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
    {
        id: 3,
        name: 'Prof. Andika Wijaya, Ph.D',
        role: 'Guru Besar • Sistem Cerdas & Robotika',
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=256&q=80',
        tags: ['Robotics', 'Embedded System', 'AIoT'],
        education: ['Ph.D Robotics – TU Munich', 'M.Eng Automation – ITS', 'S1 Teknik Elektro – ITB'],
        research: ['Swarm Robotics', 'Smart Agriculture', 'Human-Robot Interaction'],
        bio: 'Prof. Andika memimpin laboratorium Sistem Cerdas dan telah memperoleh berbagai hibah riset nasional serta kolaborasi internasional.',
        contacts: [
            { type: 'email', href: 'mailto:andika@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'linkedin', href: '#', icon: <FaLinkedin /> },
            { type: 'web', href: '#', icon: <FaGlobe /> },
        ],
    },
];

const DosenProfile = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="glass-page lecturer-page">
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="glass-background-grid"></div>
            <div className="lecturer-orb orb-left" aria-hidden></div>
            <div className="lecturer-orb orb-right" aria-hidden></div>

            <div className="glass-header">
                <div className="glass-header-left">
                    <img
                        src="/Lambang_Universitas_Negeri_Medan.png"
                        alt="Lambang Universitas Negeri Medan"
                        className="glass-header-logo"
                    />
                    <div className="glass-header-text">
                        Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="glass-title">Profil Dosen</h1>

                <div className="glass-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="lecturer-grid">
                {lecturers.map((lecturer) => (
                    <article key={lecturer.id} className="glass-panel lecturer-card">
                        <img src={lecturer.avatar} alt={lecturer.name} className="lecturer-avatar" />
                        <h3>{lecturer.name}</h3>
                        <p>{lecturer.role}</p>

                        <div className="lecturer-tags">
                            {lecturer.tags.map((tag) => (
                                <span key={tag} className="lecturer-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="lecturer-btn" onClick={() => setSelected(lecturer)}>
                            Lihat Detail
                        </button>
                    </article>
                ))}
            </div>

            <button
                className="glass-back-bottom"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        try {
                            if (window.history && window.history.length > 1) {
                                window.history.back();
                                return;
                            }
                        } catch (e) {}
                        window.location.hash = "#/home";
                    }
                }}
                aria-label="Kembali"
            >
                Kembali
            </button>

            {selected && (
                <div
                    className="lecturer-modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelected(null)}
                >
                    <div className="glass-panel lecturer-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="lecturer-modal__close" onClick={() => setSelected(null)} aria-label="Tutup detail">
                            ×
                        </button>

                        <div className="lecturer-modal__header">
                            <img src={selected.avatar} alt={selected.name} />
                            <div className="lecturer-modal__title">
                                <h2>{selected.name}</h2>
                                <p>{selected.role}</p>
                            </div>
                        </div>

                        <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                        <div className="lecturer-modal__sections">
                            <div className="lecturer-modal__section">
                                <h4><FaGraduationCap /> Pendidikan</h4>
                                <ul>
                                    {selected.education.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lecturer-modal__section">
                                <h4><FaFlask /> Minat Penelitian</h4>
                                <ul>
                                    {selected.research.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lecturer-modal__section lecturer-modal__bio">
                            <h4><FaQuoteLeft /> Biografi Singkat</h4>
                            <p>{selected.bio}</p>
                        </div>

                        <div className="lecturer-contact-links">
                            {selected.contacts.map((contact) => (
                                <a key={contact.type} href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.type}>
                                    {contact.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DosenProfile;

