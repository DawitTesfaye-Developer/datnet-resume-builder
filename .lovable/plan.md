

## Plan: Add International Organization CV/Resume Templates

### Overview
Add 4 new specialized templates designed for international and NGO career applications: **African Union (AU)**, **United Nations (UN)**, **International NGO**, and **National NGO**. These organizations have distinct CV formats (e.g., UN P-11 style, AU formal format). A new field category `international_org` will be added.

### Changes

#### 1. Update `src/types/resume.ts`
- Add `international_org` to the `FieldCategory` union type
- Add entry to `fieldCategories` array: `{ value: 'international_org', label: 'International Organizations', icon: '🌍', description: 'UN, AU, NGOs, Multilateral' }`

#### 2. Create 4 New Template Components

**`src/components/templates/AfricanUnionTemplate.tsx`**
- AU gold/green color scheme (AU brand colors)
- Formal header with nationality, date of birth fields (common in AU applications)
- Sections: Personal Statement, Professional Experience, Education, Languages (with proficiency levels - critical for AU), Publications, References
- Two-column layout with sidebar for personal details

**`src/components/templates/UnitedNationsTemplate.tsx`**
- UN blue (#009edb) color scheme
- P-11/PHP-style format: clean, formal, structured
- Sections: Summary, Employment Record, Education, Languages (with UN proficiency scale), Skills, References
- Emphasis on duty station, grade level display, nationality/DOB fields

**`src/components/templates/InternationalNGOTemplate.tsx`**
- Professional teal/blue-green scheme
- Focus on: Mission Statement, Field Experience, Program Management, Technical Skills, Languages, Publications
- Highlights humanitarian/development sector keywords
- Clean modern layout suitable for ICRC, MSF, Oxfam-style applications

**`src/components/templates/NationalNGOTemplate.tsx`**
- Warm, approachable design (earth tones - amber/brown)
- Sections: Profile, Community Experience, Program Coordination, Education, Certifications, Languages, References
- Focus on grassroots/community impact, volunteer experience emphasis

#### 3. Update `src/components/templates/index.ts`
- Import and register all 4 new templates
- Map them to `international_org` and `government` fields
- Mark UN and AU templates as `popular: true`

#### 4. Update `src/components/TemplateHoverPreview.tsx`
- No changes needed (already renders any template component dynamically)

### Technical Notes
- All templates follow the existing `({ data }: { data: ResumeData })` component signature
- Templates will use existing `ResumeData` fields (nationality/DOB can map to `location` and summary contextually)
- Languages section with proficiency is already supported in the data model

