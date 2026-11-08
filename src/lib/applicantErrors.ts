// What to tell a person when the submit-website-form function refuses an applicant form.
//
// The function answers 400 with either { error: 'invalid', fields: { date_of_birth: 'invalid', ... } } (it names each field it did not accept) or
// { error: 'invalid', message: '...' } (one plain sentence from the database rule, e.g. "Please add a photo of yourself."). This turns those into
// sentences a person can act on. It returns null when it has nothing specific, and the caller then shows its generic "Something went wrong".

const FIELD_TEXT: Record<string, string> = {
  name: 'Please enter your full name.',
  email: 'Please enter a valid email address.',
  phone: 'Please give a Malaysian mobile number, for example 012-345 6789.',
  lives_in_malaysia: 'Please tick that you live in Malaysia now.',
  malaysia_state: 'Please choose the state or area where you live.',
  photo_path: 'Your photo could not be used. Please choose it again.',
  cv_path: 'Your CV could not be used. Please choose it again.',
  date_of_birth: 'Please check your date of birth. It must be a real date in the past.',
  files: 'Please add your photo.',
};

export function problemText(out: unknown): string | null {
  if (!out || typeof out !== 'object') return null;
  const o = out as { message?: unknown; fields?: unknown };
  if (typeof o.message === 'string' && o.message) return o.message;
  if (!o.fields || typeof o.fields !== 'object') return null;
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const k of Object.keys(o.fields as Record<string, unknown>)) {
    let t: string | undefined;
    if (k.startsWith('files.')) {
      if (k.endsWith('.content_type')) t = 'That file type is not allowed. The photo must be JPG, PNG or WebP.';
      else if (k.endsWith('.size')) t = 'The photo is too large. It can be up to 5 MB.';
      else t = FIELD_TEXT.files;
    } else {
      t = FIELD_TEXT[k];
    }
    if (t && !seen.has(t)) {
      seen.add(t);
      parts.push(t);
    }
  }
  return parts.length ? parts.join(' ') : null;
}
