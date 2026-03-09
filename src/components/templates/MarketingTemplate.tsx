import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, TrendingUp, Target, BarChart3 } from 'lucide-react';

const MarketingTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages, references, referencesAvailable } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header - vibrant gradient */}
      <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899, #a855f7)' }}>
        <div className="flex items-center gap-5">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-white/50" />
          )}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-white/80 text-sm font-medium mt-1 uppercase tracking-widest">Marketing Professional</p>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-white/90">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
              {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{personalInfo.portfolio}</span>}
              {personalInfo.linkedIn && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedIn}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Main Content */}
        <div className="col-span-2 p-6 space-y-5">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Brand Story
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Campaign Experience
              </h2>
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-rose-200">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-rose-500" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{exp.position}</h3>
                        <p className="text-sm text-purple-600 font-medium">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="mt-1.5 space-y-1">
                        {exp.achievements.filter(Boolean).map((a, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> Campaign Highlights
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {projects.map(proj => (
                  <div key={proj.id} className="rounded-lg border border-pink-100 bg-gradient-to-br from-rose-50 to-purple-50 p-3">
                    <h3 className="font-semibold text-sm text-gray-900">{proj.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-medium">{t}</span>
                        ))}
                      </div>
                    )}
                    {proj.link && <a href={proj.link} className="text-xs text-purple-600 underline mt-1 block">{proj.link}</a>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 bg-gray-50 p-5 space-y-5 border-l border-gray-100">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">Marketing Stack</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <span key={skill.id} className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 text-gray-800 font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-2">
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-gray-500">{cert.issuer}</p>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">Languages</h2>
              {languages.map(lang => (
                <p key={lang.id} className="text-sm">{lang.name} <span className="text-gray-400">· {lang.proficiency}</span></p>
              ))}
            </section>
          )}

          {referencesAvailable ? (
            <p className="text-xs text-gray-400 italic">References available upon request</p>
          ) : references.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">References</h2>
              {references.map(ref => (
                <div key={ref.id} className="text-sm mb-2">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-xs text-gray-500">{ref.position}, {ref.company}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingTemplate;
