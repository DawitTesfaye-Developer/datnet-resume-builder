import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';

const MediaTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header - editorial style */}
      <div className="px-8 pt-8 pb-6 border-b-4 border-black">
        <div className="flex items-center gap-5">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="" className="w-20 h-20 rounded object-cover grayscale" />
          )}
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
              {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{personalInfo.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Sidebar */}
        <div className="col-span-1 bg-gray-50 p-6 space-y-5 border-r border-gray-200">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Expertise</h2>
              <div className="space-y-1.5">
                {skills.map(skill => (
                  <span key={skill.id} className="block text-sm font-medium">{skill.name}</span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Languages</h2>
              {languages.map(lang => (
                <p key={lang.id} className="text-sm">{lang.name} <span className="text-gray-500">({lang.proficiency})</span></p>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Certifications</h2>
              {certifications.map(cert => (
                <p key={cert.id} className="text-sm mb-1">{cert.name}</p>
              ))}
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-6 space-y-5">
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">About</h2>
              <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Experience</h2>
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="border-l-2 border-black pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{exp.position}</h3>
                        <p className="text-sm text-gray-600 italic">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                        {exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Published Work & Projects</h2>
              <div className="space-y-3">
                {projects.map(proj => (
                  <div key={proj.id} className="border-l-2 border-gray-300 pl-4">
                    <h3 className="font-semibold text-sm">{proj.name}</h3>
                    <p className="text-sm text-gray-700">{proj.description}</p>
                    {proj.link && <a href={proj.link} className="text-xs text-blue-600 underline">{proj.link}</a>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {referencesAvailable ? (
            <p className="text-sm text-gray-500 italic">References available upon request</p>
          ) : references.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">References</h2>
              <div className="grid grid-cols-2 gap-3">
                {references.map(ref => (
                  <div key={ref.id} className="text-sm">
                    <p className="font-semibold">{ref.name}</p>
                    <p className="text-gray-600">{ref.position}, {ref.company}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaTemplate;
