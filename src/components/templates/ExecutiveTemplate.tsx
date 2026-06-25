import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
      {/* Header */}
      <header className="bg-slate-900 text-white p-10 text-center">
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/20" />
        )}
        <h1 className="text-4xl font-light tracking-widest uppercase mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300 mt-4">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedIn}
            </span>
          )}
        </div>
      </header>

      <div className="p-10">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-10 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 italic leading-relaxed">
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-10">
            <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">
              Executive Experience
            </h2>
            <div className="border-t border-b border-slate-200 py-6 space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-semibold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-600">{exp.company}</p>
                    <p className="text-sm text-slate-400">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-center text-gray-600 mb-3 max-w-2xl mx-auto">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                      <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Key Achievements</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-slate-400">◆</span>
                            {achievement}
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
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 text-center">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.field}</p>
                    <p className="text-sm text-slate-400">{edu.institution}</p>
                    <p className="text-xs text-slate-400">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 text-center">
                Core Competencies
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-4 py-2 border border-slate-300 text-sm text-slate-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-400 p-8">
          <p>Your resume preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
