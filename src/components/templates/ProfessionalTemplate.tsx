import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, BookOpen, Languages as LanguagesIcon } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto print:shadow-none"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif", lineHeight: '1.5' }}
    >
      {/* Header */}
      <header className="px-10 pt-10 pb-6 border-b-[3px] border-gray-800">
        <div className="flex items-start gap-5">
          {personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt=""
              className="w-[72px] h-[72px] rounded-full object-cover ring-2 ring-gray-200 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2.5 text-[11px] text-gray-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedIn && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-gray-400" />
                  {personalInfo.linkedIn}
                </span>
              )}
              {personalInfo.portfolio && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  {personalInfo.portfolio}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-10 py-7 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Professional Summary
            </h2>
            <p className="text-[11px] text-gray-700 leading-[1.65]">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-[12px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[11px] text-gray-600 mt-0.5">{exp.company}{exp.location && ` · ${exp.location}`}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-gray-600 mt-1.5 leading-[1.6]">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-5 mt-1.5 space-y-0.5">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-[11px] text-gray-700 leading-[1.6]">{achievement}</li>
                      ))}
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
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-[12px] font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-[11px] text-gray-600">{edu.institution}{edu.location && ` · ${edu.location}`}</p>
                    {edu.gpa && <p className="text-[10px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.endDate)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s.id} className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[10px] rounded border border-gray-200">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-[10px] text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="text-[10px] text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-[12px] font-bold text-gray-900">
                    {project.name}
                    {project.link && <span className="font-normal text-[10px] text-gray-500 ml-2">({project.link})</span>}
                  </h3>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-[1.6]">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              Languages
            </h2>
            <p className="text-[11px] text-gray-700">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold text-gray-900 border-b-[1.5px] border-gray-300 pb-1 mb-3 uppercase tracking-[0.12em]">
              References
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="text-[10px]">
                  <p className="font-semibold text-gray-900">{ref.name}</p>
                  <p className="text-gray-600">{ref.position}, {ref.company}</p>
                  <p className="text-gray-500">{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {referencesAvailable && references.length === 0 && (
          <p className="text-[10px] italic text-gray-500">References available upon request</p>
        )}
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
