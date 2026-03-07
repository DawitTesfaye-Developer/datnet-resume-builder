import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

const HRTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2d3748] text-white px-8 py-6">
        <div className="flex items-center gap-4">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-white/30" />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-[#a0aec0] text-lg mt-1">Human Resources Professional</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedIn}</span>}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Core Competencies */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Core Competencies</h2>
            <div className="grid grid-cols-3 gap-2">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#e2a83e] rounded-full" />
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#2d3748]">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-0.5">
                      {exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-sm">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-gray-600">{edu.institution} • {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Certifications</h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map(cert => (
                <div key={cert.id} className="text-sm">
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-gray-500"> – {cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">Languages</h2>
            <div className="flex flex-wrap gap-3">
              {languages.map(lang => (
                <span key={lang.id} className="text-sm bg-gray-100 px-3 py-1 rounded">{lang.name} – {lang.proficiency}</span>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {!referencesAvailable && references.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#2d3748] border-b-2 border-[#e2a83e] pb-1 mb-3">References</h2>
            <div className="grid grid-cols-2 gap-4">
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
        {referencesAvailable && (
          <p className="text-sm text-gray-500 italic">References available upon request</p>
        )}
      </div>
    </div>
  );
};

export default HRTemplate;
