import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const GovernmentTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Arial', sans-serif" }}>
      {/* Header - formal government style */}
      <div className="bg-[#1a365d] text-white px-8 py-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="w-12 h-0.5 bg-[#c53030] my-2" />
        <div className="flex flex-wrap gap-4 text-sm text-blue-200">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-5">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Professional Summary</h2>
            <p className="text-sm leading-relaxed px-1">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Professional Experience</h2>
            <div className="space-y-4 px-1">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <h3 className="font-bold text-sm">{exp.position}</h3>
                  <p className="text-sm text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  <p className="text-xs text-gray-500 mb-1">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  {exp.description && <p className="text-sm text-gray-700">{exp.description}</p>}
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

        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Education</h2>
            <div className="px-1">
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <h3 className="font-bold text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-700">{edu.institution} • {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Key Competencies</h2>
              <div className="grid grid-cols-2 gap-1 px-1">
                {skills.map(skill => (
                  <p key={skill.id} className="text-sm">• {skill.name}</p>
                ))}
              </div>
            </section>
          )}

          <div className="space-y-5">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Certifications & Clearances</h2>
                <div className="px-1">
                  {certifications.map(cert => (
                    <p key={cert.id} className="text-sm mb-1"><span className="font-medium">{cert.name}</span> – {cert.issuer}</p>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">Languages</h2>
                <div className="px-1">
                  {languages.map(lang => (
                    <p key={lang.id} className="text-sm">{lang.name} – {lang.proficiency}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {referencesAvailable ? (
          <p className="text-sm text-gray-500 italic">References available upon request</p>
        ) : references.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider bg-blue-50 px-3 py-1.5 mb-3">References</h2>
            <div className="grid grid-cols-2 gap-3 px-1">
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

export default GovernmentTemplate;
