// node scripts/test-applicant-errors.mts   (Node 22.6+ strips the types)
import { problemText } from '../src/lib/applicantErrors.ts';

let failed = false;
const eq = (got: unknown, want: unknown, label: string) => {
  if (got !== want) { failed = true; console.log('FAIL', label, '\n  got :', got, '\n  want:', want); } else console.log('ok  ', label);
};

eq(problemText({ error: 'invalid', fields: { date_of_birth: 'invalid' } }), 'Please check your date of birth. It must be a real date in the past.', 'impossible date of birth');
eq(problemText({ error: 'invalid', fields: { phone: 'not a Malaysian mobile', malaysia_state: 'required' } }), 'Please give a Malaysian mobile number, for example 012-345 6789. Please choose the state or area where you live.', 'two fields, in order');
eq(problemText({ error: 'invalid', fields: { 'files.0.content_type': 'not allowed' } }), 'That file type is not allowed. The photo must be JPG, PNG or WebP.', 'wrong photo type');
eq(problemText({ error: 'invalid', fields: { 'files.0.size': 'too large' } }), 'The photo is too large. It can be up to 5 MB.', 'photo too large');
eq(problemText({ error: 'invalid', fields: { photo_path: 'required' } }), 'Your photo could not be used. Please choose it again.', 'photo missing at the final step');
eq(problemText({ error: 'invalid', message: 'Please add a photo of yourself.' }), 'Please add a photo of yourself.', "the database's own sentence wins");
eq(problemText({ error: 'invalid', fields: { something_new: 'x' } }), null, 'unknown field -> generic text');
eq(problemText({ error: 'unavailable' }), null, 'server fault -> generic text');
eq(problemText(null), null, 'no answer -> generic text');
eq(problemText('oops'), null, 'not an object -> generic text');
if (failed) process.exit(1);
