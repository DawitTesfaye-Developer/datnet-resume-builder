import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const ConstructionTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#c05621] px-8 py-6">
        <div className="flex items-center gap-4">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="" className="w-20 h-20 rounded object-cover border-2 border-white/30" />
          )}
          <div className="text-white">
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-orange-200 mt-1">Construction & Architecture Professional</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-orange-100">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-5">
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Certifications & Safety - important in construction */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Licenses & Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map(cert => (
                <div key={cert.id} className="bg-orange-50 px-3 py-2 rounded text-sm">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-600 text-xs">{cert.issuer} • {formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Skills & Equipment
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-gray-100 text-sm px-3 py-1 rounded-full font-medium">{skill.name}</span>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id} className="border-l-3 border-[#c05621] pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
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
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Key Projects
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map(proj => (
                <div key={proj.id} className="bg-gray-50 p-3 rounded">
                  <h3 className="font-semibold text-sm">{proj.name}</h3>
                  <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <h3 className="font-semibold text-sm">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-gray-600">{edu.institution} • {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c05621]" /> Languages
            </h2>
            <div className="flex gap-4">
              {languages.map(lang => (
                <span key={lang.id} className="text-sm">{lang.name} ({lang.proficiency})</span>
              ))}
            </div>
          </section>
        )}

        {referencesAvailable ? (
          <p className="text-sm text-gray-500 italic">References available upon request</p>
        ) : references.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#c05621] mb-2">References</h2>
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

export default ConstructionTemplate;
