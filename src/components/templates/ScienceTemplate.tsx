import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';

const ScienceTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, publications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl p-8" style={{ fontFamily: "'Times New Roman', serif" }}>
      {/* Header - Academic style */}
      <header className="text-center border-b-2 border-[#1a365d] pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[#1a365d]">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-[#2b6cb0] mt-1">Research Scientist</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.portfolio}</span>}
        </div>
      </header>

      <div className="space-y-5">
        {personalInfo.summary && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Research Interests</h2>
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <h3 className="font-bold text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-xs text-gray-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
              </div>
            ))}
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Research Experience</h2>
            <div className="space-y-3">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-sm">{exp.position}</h3>
                      <p className="text-sm text-gray-700 italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {publications.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Publications</h2>
            <ol className="list-decimal list-inside text-sm space-y-1">
              {publications.map(pub => (
                <li key={pub.id}>
                  {pub.title}. <span className="italic">{pub.publisher}</span>, {formatDate(pub.date)}.
                  {pub.link && <a href={pub.link} className="text-blue-600 ml-1">[Link]</a>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Research Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <h3 className="font-semibold text-sm">{proj.name}</h3>
                <p className="text-sm text-gray-700">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Technical Skills</h2>
              <div className="space-y-1">
                {skills.map(skill => <p key={skill.id} className="text-sm">• {skill.name}</p>)}
              </div>
            </section>
          )}

          <div className="space-y-5">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Certifications</h2>
                {certifications.map(cert => (
                  <p key={cert.id} className="text-sm">{cert.name} – {cert.issuer}</p>
                ))}
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Languages</h2>
                {languages.map(lang => (
                  <p key={lang.id} className="text-sm">{lang.name} ({lang.proficiency})</p>
                ))}
              </section>
            )}
          </div>
        </div>

        {referencesAvailable ? (
          <p className="text-sm text-gray-500 italic text-center mt-4">References available upon request</p>
        ) : references.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-[#1a365d] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">References</h2>
            <div className="grid grid-cols-2 gap-3">
              {references.map(ref => (
                <div key={ref.id} className="text-sm">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-gray-600">{ref.position}, {ref.company}</p>
                  <p className="text-gray-500">{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ScienceTemplate;
