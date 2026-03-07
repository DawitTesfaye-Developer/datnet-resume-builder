import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LogisticsTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#2c5282] px-8 py-6 flex items-center gap-5">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="" className="w-18 h-18 rounded object-cover" />
        )}
        <div className="text-white flex-1">
          <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-blue-200">Supply Chain & Logistics</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-blue-200">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Sidebar */}
        <div className="bg-[#ebf4ff] p-6 space-y-5">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#2c5282] uppercase tracking-widest mb-2">Core Skills</h2>
              <div className="space-y-1.5">
                {skills.map(skill => (
                  <div key={skill.id} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#2c5282] rounded-full" />
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#2c5282] uppercase tracking-widest mb-2">Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-2">
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#2c5282] uppercase tracking-widest mb-2">Languages</h2>
              {languages.map(lang => (
                <p key={lang.id} className="text-sm">{lang.name} – {lang.proficiency}</p>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-[#2c5282] uppercase tracking-widest mb-2">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-medium">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Main */}
        <div className="col-span-2 p-6 space-y-5">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold text-[#2c5282] uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">Professional Summary</h2>
              <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-[#2c5282] uppercase tracking-wider mb-3 border-b border-blue-200 pb-1">Professional Experience</h2>
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{exp.position}</h3>
                        <p className="text-sm text-[#2c5282]">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
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

          {referencesAvailable ? (
            <p className="text-sm text-gray-500 italic">References available upon request</p>
          ) : references.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-[#2c5282] uppercase tracking-wider mb-2 border-b border-blue-200 pb-1">References</h2>
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
    </div>
  );
};

export default LogisticsTemplate;
