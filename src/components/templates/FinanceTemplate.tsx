import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const FinanceTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experiences, education, skills, certifications } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 shadow-xl max-w-[8.5in] mx-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header */}
      <header className="border-b-4 border-emerald-800 p-8">
        <h1 className="text-4xl font-bold text-emerald-900 text-center tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedIn}
            </span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b-2 border-emerald-200 pb-1 mb-3">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Key Metrics/Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b-2 border-emerald-200 pb-1 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Core Competencies
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="text-center py-2 px-3 bg-emerald-50 border border-emerald-200 text-sm"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b-2 border-emerald-200 pb-1 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start border-l-3 border-emerald-600 pl-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="font-semibold text-emerald-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="mt-3 space-y-2 pl-4">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b-2 border-emerald-200 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-emerald-700">{edu.field}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-800 border-b-2 border-emerald-200 pb-1 mb-3">
              Certifications & Licenses
            </h2>
            {certifications.length > 0 ? (
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-sm">
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-gray-500"> – {cert.issuer}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">CFA, CPA, FRM, Series 7, etc.</p>
            )}
          </section>
        </div>
      </div>

      {/* Empty State */}
      {!personalInfo.fullName && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-400 p-8">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-emerald-300" />
          <p>Your finance resume will appear here</p>
        </div>
      )}
    </div>
  );
};

export default FinanceTemplate;
