import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Calendar } from 'lucide-react';

const HospitalityTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#744210] to-[#975a16] text-white px-8 py-8 text-center">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-3 border-white/40" />
        )}
        <h1 className="text-3xl font-bold tracking-widest uppercase">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="w-16 h-0.5 bg-[#d69e2e] mx-auto my-3" />
        <p className="text-[#fbd38d] tracking-wide">Hospitality Professional</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-[#fbd38d]">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-[#744210] font-medium">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-0.5">
                      {exp.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Skills</h2>
              <div className="space-y-1.5">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2 text-sm">
                    <span className="text-[#d69e2e]">★</span> {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Languages</h2>
              <div className="space-y-1.5">
                {languages.map(lang => (
                  <div key={lang.id} className="text-sm">
                    <span className="font-medium">{lang.name}</span> – <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-sm">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-gray-600">{edu.institution} • {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">Certifications</h2>
            <div className="space-y-1">
              {certifications.map(cert => (
                <p key={cert.id} className="text-sm"><span className="font-medium">{cert.name}</span> – {cert.issuer}</p>
              ))}
            </div>
          </section>
        )}

        {referencesAvailable ? (
          <p className="text-sm text-gray-500 italic">References available upon request</p>
        ) : references.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#744210] uppercase tracking-wider border-b border-[#d69e2e] pb-1 mb-3">References</h2>
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

export default HospitalityTemplate;
