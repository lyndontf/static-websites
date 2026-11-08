'use client';

import { useState, useRef } from 'react';
import { submitBiodataApplication, type BiodataPreviousEmployer } from '@/lib/supabase';
import { MALAYSIA_STATES, missingForCandidate } from '@/lib/candidateRules';
import { GuardFields, useFormGuard } from '@/lib/formGuard';

const CATEGORIES = [
  { value: '', label: 'Select a category...' },
  { value: 'Domestic Maid', label: 'Domestic Maid / Helper' },
  { value: 'Home Elder Care', label: 'Home Elder Care' },
  { value: 'Specialist — Dementia Care', label: 'Specialist — Dementia Care' },
  { value: 'Childcare Specialist', label: 'Childcare Specialist' },
];

const MARITAL_OPTIONS = ['', 'Single', 'Married', 'Divorced', 'Widowed'];
const EDUCATION_OPTIONS = ['', 'No Formal Education', 'Primary School', 'Secondary School', 'High School / SPM', 'Diploma', 'Degree'];
const RELIGION_OPTIONS = ['', 'Islam', 'Christianity', 'Buddhism', 'Hinduism', 'Other'];
const FOOD_OPTIONS = ['', 'No Preference', 'Halal', 'Vegetarian', 'Non-Vegetarian'];

const COMMON_LANGUAGES = ['English', 'Bahasa Malaysia', 'Bahasa Indonesia', 'Mandarin', 'Cantonese', 'Hokkien', 'Tamil', 'Filipino/Tagalog', 'Hindi'];
const LANG_LEVELS = ['Basic', 'Conversational', 'Fluent'];

const INPUT_CLASS = 'glc-input';
const LABEL_CLASS = 'glc-label';

export default function ForWorkersClient() {
  const guard = useFormGuard();
  // Personal info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [livesInMalaysia, setLivesInMalaysia] = useState(false);
  const [malaysiaState, setMalaysiaState] = useState('');
  const [category, setCategory] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [religion, setReligion] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [diet, setDiet] = useState('');
  const [siblingsCount, setSiblingsCount] = useState('');
  const [siblingPosition, setSiblingPosition] = useState('');

  // Languages
  const [languages, setLanguages] = useState<{ name: string; level: string }[]>([]);
  const [langName, setLangName] = useState('');
  const [langLevel, setLangLevel] = useState('Conversational');

  // Previous employers
  const [previousEmployers, setPreviousEmployers] = useState<BiodataPreviousEmployer[]>([]);

  function addEmployer() {
    setPreviousEmployers([...previousEmployers, {}]);
  }

  function removeEmployer(index: number) {
    setPreviousEmployers(previousEmployers.filter((_, i) => i !== index));
  }

  function updateEmployer(index: number, key: keyof BiodataPreviousEmployer, value: string) {
    setPreviousEmployers(previousEmployers.map((emp, i) => (i === index ? { ...emp, [key]: value } : emp)));
  }

  // Photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cover letter & state
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function addLanguage() {
    if (!langName.trim()) return;
    if (languages.some((l) => l.name.toLowerCase() === langName.trim().toLowerCase())) return;
    setLanguages([...languages, { name: langName.trim(), level: langLevel }]);
    setLangName('');
    setLangLevel('Conversational');
  }

  function removeLanguage(index: number) {
    setLanguages(languages.filter((_, i) => i !== index));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be smaller than 5MB.');
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError('');
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your full name and email address.');
      return;
    }
    // #1774: a photo, a Malaysian mobile and "I live in Malaysia now" with a state are needed; say plainly which is missing
    const missing = missingForCandidate({ photo: photoFile, phone, livesInMalaysia, state: malaysiaState });
    if (missing.length) {
      setError(missing.join(' '));
      return;
    }
    setSubmitting(true);
    setError('');

    // The bot check (Cloudflare Turnstile, normally invisible) runs before the photo is uploaded; the photo and the form then go through the server function.
    const checked = await guard.collect();
    if (!checked) {
      setError('We could not confirm you are not a robot. Please reload the page and try again.');
      setSubmitting(false);
      return;
    }

    const result = await submitBiodataApplication({
      full_name: name.trim(),
      applicant_email: email.trim(),
      applicant_phone: phone.trim(),
      job_category: category || undefined,
      nationality: nationality.trim() || undefined,
      date_of_birth: dob || undefined,
      marital_status: maritalStatus || undefined,
      education_level: educationLevel || undefined,
      religion: religion || undefined,
      height_cm: heightCm ? parseFloat(heightCm) : undefined,
      weight_kg: weightKg ? parseFloat(weightKg) : undefined,
      food_preference: foodPreference || undefined,
      diet: diet.trim() || undefined,
      siblings_count: siblingsCount ? parseInt(siblingsCount, 10) : undefined,
      sibling_position: siblingPosition ? parseInt(siblingPosition, 10) : undefined,
      languages: languages.length > 0 ? languages : undefined,
      previous_employers: previousEmployers.length > 0 ? previousEmployers : undefined,
      cover_letter: coverLetter.trim() || undefined,
      lives_in_malaysia: livesInMalaysia,
      malaysia_state: malaysiaState,
    }, photoFile, checked);

    guard.reset(); // a Turnstile token works once
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message || 'Something went wrong. Please try again or contact us directly.');
    }
  };

  if (submitted) {
    return (
      <div className="glc-card glc-center" style={{ background: 'var(--glc-teal-soft)', borderColor: '#CDEDEF', padding: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(30,158,106,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg className="w-8 h-8" fill="none" stroke="var(--glc-success)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{ fontSize: 'var(--glc-fs-h3)', marginBottom: 8 }}>Application Submitted!</h3>
        <p style={{ color: 'var(--glc-slate)', marginBottom: 16 }}>
          Thank you for your interest. Our team will review your application and contact you within 3 working days.
        </p>
        <p style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate-soft)' }}>
          If you have any questions, contact us at{' '}
          <a href="tel:+60193250457">+6019 325 0457</a>{' '}
          or{' '}
          <a href="mailto:enquiries@genesiscare.com.my">enquiries@genesiscare.com.my</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={guard.start} className="glc-card space-y-6">
      <GuardFields guard={guard} />
      {error && (
        <div style={{ background: '#FBEAE7', border: '1px solid #F3C7BF', color: 'var(--glc-danger)', fontSize: 'var(--glc-fs-sm)', borderRadius: 'var(--glc-r)', padding: '12px 16px' }}>
          {error}
        </div>
      )}

      {/* ─── PHOTO UPLOAD ─── */}
      <div>
        <label className={LABEL_CLASS}>Profile Photo</label>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--glc-line)' }}
              />
              <button
                type="button"
                onClick={removePhoto}
                style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, background: 'var(--glc-danger)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, border: 0, cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--glc-cloud)', border: '2px dashed var(--glc-line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="var(--glc-slate-soft)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
          <div style={{ fontSize: 'var(--glc-fs-sm)', color: 'var(--glc-slate-soft)' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{ color: 'var(--glc-teal)', fontWeight: 700, background: 'none', border: 0, cursor: 'pointer', padding: 0 }}
            >
              {photoPreview ? 'Change photo' : 'Upload a photo (required)'}
            </button>
            <p style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)', marginTop: 2 }}>JPG or PNG, max 5MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      {/* ─── SECTION: CONTACT INFO ─── */}
      <div>
        <h3 style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg className="w-4 h-4" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Full Name <span className="text-red-400">*</span></label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Siti Nurhaliza" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Email Address <span className="text-red-400">*</span></label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Malaysian mobile number (for WhatsApp) <span className="text-red-400">*</span></label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="012-345 6789 (Malaysian mobile)" className={INPUT_CLASS} />
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, fontSize: 'var(--glc-fs-sm)' }}>
              <input type="checkbox" checked={livesInMalaysia} onChange={(e) => setLivesInMalaysia(e.target.checked)} />
              I live in Malaysia now
            </label>
            {livesInMalaysia && (
              <select required value={malaysiaState} onChange={(e) => setMalaysiaState(e.target.value)} className={INPUT_CLASS} style={{ marginTop: 8 }}>
                <option value="">State or area where you live…</option>
                {MALAYSIA_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
              </select>
            )}
          </div>
          <div>
            <label className={LABEL_CLASS}>Job Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={INPUT_CLASS}>
              {CATEGORIES.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ─── SECTION: PERSONAL DETAILS ─── */}
      <div>
        <h3 style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg className="w-4 h-4" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Personal Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Nationality</label>
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="e.g. Indonesian, Malaysian" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Marital Status</label>
            <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className={INPUT_CLASS}>
              {MARITAL_OPTIONS.map((o) => <option key={o} value={o}>{o || 'Select...'}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Education Level</label>
            <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className={INPUT_CLASS}>
              {EDUCATION_OPTIONS.map((o) => <option key={o} value={o}>{o || 'Select...'}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Religion</label>
            <select value={religion} onChange={(e) => setReligion(e.target.value)} className={INPUT_CLASS}>
              {RELIGION_OPTIONS.map((o) => <option key={o} value={o}>{o || 'Select...'}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Food Preference</label>
            <select value={foodPreference} onChange={(e) => setFoodPreference(e.target.value)} className={INPUT_CLASS}>
              {FOOD_OPTIONS.map((o) => <option key={o} value={o}>{o || 'Select...'}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Height (cm)</label>
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g. 160" min="100" max="220" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Weight (kg)</label>
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="e.g. 55" min="30" max="150" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Diet</label>
            <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} placeholder="e.g. Vegetarian" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Siblings Count</label>
            <input type="number" value={siblingsCount} onChange={(e) => setSiblingsCount(e.target.value)} placeholder="e.g. 3" min="0" className={INPUT_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Sibling Position</label>
            <input type="number" value={siblingPosition} onChange={(e) => setSiblingPosition(e.target.value)} placeholder="e.g. 2 = second-born" min="1" className={INPUT_CLASS} />
          </div>
        </div>
      </div>

      {/* ─── SECTION: LANGUAGES ─── */}
      <div>
        <h3 style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg className="w-4 h-4" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
          Languages Spoken
        </h3>
        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {languages.map((l, i) => (
              <span key={i} className="glc-tag" style={{ gap: 6 }}>
                {l.name} ({l.level})
                <button type="button" onClick={() => removeLanguage(i)} style={{ marginLeft: 4, background: 'none', border: 0, cursor: 'pointer', color: 'inherit', fontWeight: 700 }}>&times;</button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <select value={langName} onChange={(e) => setLangName(e.target.value)} className={`${INPUT_CLASS} flex-1`}>
            <option value="">Select language...</option>
            {COMMON_LANGUAGES.filter((l) => !languages.some((x) => x.name === l)).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
            <option value="__other">Other...</option>
          </select>
          <select value={langLevel} onChange={(e) => setLangLevel(e.target.value)} className={`${INPUT_CLASS} flex-1`}>
            {LANG_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <button
            type="button"
            onClick={addLanguage}
            className="glc-btn glc-btn--primary flex-shrink-0"
          >
            Add
          </button>
        </div>
        {langName === '__other' && (
          <input
            type="text"
            placeholder="Type language name..."
            className={`${INPUT_CLASS} mt-2`}
            onChange={(e) => setLangName(e.target.value)}
            value=""
          />
        )}
      </div>

      {/* ─── SECTION: PREVIOUS EMPLOYERS ─── */}
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg className="w-4 h-4" stroke="var(--glc-teal)" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Previous Employers
          </h3>
          <button type="button" onClick={addEmployer} style={{ fontSize: 'var(--glc-fs-xs)', fontWeight: 700, color: 'var(--glc-teal)', background: 'none', border: 0, cursor: 'pointer', padding: 0 }}>
            + Add Employer
          </button>
        </div>
        {previousEmployers.length === 0 && (
          <p style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)', fontStyle: 'italic' }}>No previous employers to add (optional).</p>
        )}
        {previousEmployers.map((emp, i) => (
          <div key={i} style={{ background: 'var(--glc-cloud)', borderRadius: 'var(--glc-r)', border: '1px solid var(--glc-line)', padding: 12, marginBottom: 10 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 'var(--glc-fs-sm)', fontWeight: 700, color: 'var(--glc-ink)' }}>Employer {i + 1}</span>
              <button type="button" onClick={() => removeEmployer(i)} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--glc-danger)', fontWeight: 700 }}>&times;</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={emp.country || ''} onChange={(e) => updateEmployer(i, 'country', e.target.value)} placeholder="Country" className={INPUT_CLASS} />
              <input type="text" value={emp.housing_type || ''} onChange={(e) => updateEmployer(i, 'housing_type', e.target.value)} placeholder="Housing Type" className={INPUT_CLASS} />
              <input type="text" value={emp.period_from || ''} onChange={(e) => updateEmployer(i, 'period_from', e.target.value)} placeholder="Period From (e.g. 2019)" className={INPUT_CLASS} />
              <input type="text" value={emp.period_to || ''} onChange={(e) => updateEmployer(i, 'period_to', e.target.value)} placeholder="Period To (e.g. 2021)" className={INPUT_CLASS} />
              <input type="text" value={emp.family_composition || ''} onChange={(e) => updateEmployer(i, 'family_composition', e.target.value)} placeholder="Family Composition" className={`${INPUT_CLASS} sm:col-span-2`} />
              <input type="text" value={emp.duties || ''} onChange={(e) => updateEmployer(i, 'duties', e.target.value)} placeholder="Duties" className={`${INPUT_CLASS} sm:col-span-2`} />
              <input type="text" value={emp.termination_reason || ''} onChange={(e) => updateEmployer(i, 'termination_reason', e.target.value)} placeholder="Termination Reason" className={INPUT_CLASS} />
              <input type="text" value={emp.remarks || ''} onChange={(e) => updateEmployer(i, 'remarks', e.target.value)} placeholder="Remarks" className={INPUT_CLASS} />
            </div>
          </div>
        ))}
      </div>

      {/* ─── ABOUT YOURSELF ─── */}
      <div>
        <label className={LABEL_CLASS}>Tell Us About Yourself</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Briefly describe your experience, skills, and what type of work you're looking for..."
          rows={4}
          className="glc-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="glc-btn glc-btn--primary glc-btn--block"
        style={submitting ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
      >
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>

      <p style={{ fontSize: 'var(--glc-fs-xs)', color: 'var(--glc-slate-soft)', textAlign: 'center' }}>
        By submitting this form, you agree to allow us to store your information for placement purposes.
        We will never share your data with unauthorized third parties. If your profile is published, your age, marital status and languages may be shown on Genesis websites.
      </p>
    </form>
  );
}
