import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto print:shadow-none"
      style={{ fontFamily: "'Cambria', 'Georgia', serif", lineHeight: '1.5' }}
    >
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-800 text-white px-12 py-10 text-center">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="" className="w-[80px] h-[80px] rounded-full object-cover mx-auto mb-4 ring-2 ring-white/15" />
        )}
        <h1 className="text-[32px] font-light tracking-[0.2em] uppercase leading-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="w-16 h-px bg-white/30 mx-auto mt-4 mb-4" />
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-1 text-[11px] text-slate-300">
          {personalInfo.email && (
            <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-2"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedIn}</span>
          )}
        </div>
      </header>

      <div className="px-12 py-9">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-9 text-center max-w-[540px] mx-auto">
            <p className="text-[13px] text-gray-600 italic leading-[1.7]">
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-9">
            <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-5">
              Executive Experience
            </h2>
            <div className="border-t border-b border-slate-200 py-6 space-y-7">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="text-center mb-3">
                    <h3 className="text-[15px] font-semibold text-slate-900">{exp.position}</h3>
                    <p className="text-[12px] text-slate-600">{exp.company}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-center text-[11px] text-gray-600 mb-3 max-w-[480px] mx-auto leading-[1.65]">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements.length > 0 && (
                    <div className="max-w-[500px] mx-auto">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Key Achievements</p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {exp.achievements.map((a, idx) => (
                          <li key={idx} className="text-[11px] text-gray-600 flex items-start gap-2 leading-[1.6]">
                            <span className="text-slate-300 mt-[2px]">◆</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="text-[12px] font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-600">{edu.field}</p>
                    <p className="text-[10px] text-slate-400">{edu.institution}</p>
                    <p className="text-[9px] text-slate-400">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">
                Core Competencies
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-3.5 py-1.5 border border-slate-200 text-[10px] text-slate-700 bg-slate-50">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">
              Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-center text-[10px]">
                  <p className="font-semibold text-slate-800">{cert.name}</p>
                  <p className="text-slate-400">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3 text-center">
              Languages
            </h2>
            <p className="text-center text-[11px] text-slate-600">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">
              References
            </h2>
            <div className="grid grid-cols-2 gap-4 max-w-[480px] mx-auto">
              {references.map((ref) => (
                <div key={ref.id} className="text-center text-[10px]">
                  <p className="font-semibold text-slate-800">{ref.name}</p>
                  <p className="text-slate-500">{ref.position}, {ref.company}</p>
                  <p className="text-slate-400">{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {referencesAvailable && references.length === 0 && (
          <p className="text-[10px] italic text-slate-400 text-center mt-6">References available upon request</p>
        )}
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-16 text-gray-400 p-8">
          <p className="text-sm">Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
