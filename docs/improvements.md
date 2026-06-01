# Improvements & Technical Debt

This document tracks improvements and technical debt items that should be addressed in future iterations.

## TypeScript Type Safety

### Remove @ts-nocheck from lib/db.ts and app/(app)/dashboard/page.tsx

**Status:** Temporary workaround in place

**Issue:** The hand-written `Database` type in `lib/database.types.ts` doesn't match Supabase's exact expected structure, causing TypeScript to infer `never` types for all Supabase query results. This requires adding `@ts-nocheck` to bypass type checking.

**Solution:** Generate proper TypeScript types using the Supabase CLI:
```bash
supabase gen types typescript --local > lib/database.types.ts
```

**Requirements:** 
- Docker Desktop must be installed and running
- Supabase CLI must be installed and linked to the project

**Files affected:**
- `lib/db.ts` (line 1)
- `app/(app)/dashboard/page.tsx` (line 1)

**Priority:** Medium (doesn't affect runtime, but reduces type safety)

## Future Authentication Features

### Re-add Google OAuth Login

**Status:** Removed (can be re-added in future)

**Issue:** Google OAuth login was removed to simplify the authentication flow to email/password only.

**Solution:** Re-implement Google OAuth using Supabase Auth:
- Add Google OAuth button back to `app/(auth)/login/page.tsx` and `app/(auth)/signup/page.tsx`
- Configure Google OAuth provider in Supabase dashboard
- Ensure proper callback handling in `app/auth/callback/route.ts`

**Benefits:**
- Faster sign-up/sign-in process
- Reduced friction for users
- Social login convenience

**Priority:** Low (nice-to-have feature, current email/password flow works well)

---

### Re-add Onboarding Flow

**Status:** Removed (can be re-added in future)

**Issue:** Onboarding flow was removed to simplify user setup. User profile data (name, state, GST registration status) should be collected during sign-up instead.

**Solution:** Re-implement onboarding as a separate step after sign-up:
- Restore `app/onboarding/page.tsx` and `app/onboarding/OnboardingForm.tsx`
- Restore `app/api/onboarding/complete/route.ts` and `app/api/onboarding/status/route.ts`
- Restore `lib/onboarding.ts` with onboarding logic
- Update `proxy.ts` and `lib/auth-redirect.ts` to check onboarding status
- Collect user profile data (name, profession, state, GST registration status) in a multi-step form

**Benefits:**
- Cleaner sign-up form (email/password only initially)
- Progressive disclosure of information collection
- Better user experience for new users
- Can guide users through understanding GST thresholds

**Priority:** Low (current sign-up form collects necessary data, onboarding adds UX polish)
