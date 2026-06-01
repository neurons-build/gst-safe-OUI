# Future Features for GSTSafe

## Multi-Currency Support with Automatic INR Conversion

**Status**: Future Feature (Not in MVP)

**Description**:
Add support for logging income in multiple currencies (USD, EUR, GBP, etc.) with automatic conversion to INR before storing in the database.

**Implementation Plan**:

1. Add currency selector to income entry form (default: INR)
2. Integrate with exchange rate API (e.g., exchangerate-api.com, fixer.io, or free API like Frankfurter)
3. On income entry:
   - If currency != INR, fetch current exchange rate
   - Convert amount to INR using the rate
   - Store both original amount + currency AND converted INR amount in database
   - Display original amount with currency in UI, but use INR amount for all calculations
4. Cache exchange rates for 24 hours to reduce API calls
5. Handle API failures gracefully (use last known rate or show error)

**Database Schema Changes**:

- Add `original_amount` (integer in smallest unit of original currency)
- Add `original_currency` (varchar, e.g., "USD", "EUR")
- Add `exchange_rate_used` (decimal, rate at time of conversion)
- Keep `amount` as INR in paise (for calculations)

**UI Changes**:

- Income form: Add currency dropdown (INR, USD, EUR, GBP, etc.)
- Income list: Show "₹85,000 (USD $1,020)" format
- Dashboard: All calculations still use INR

**API Options**:

- **Free**: Frankfurter API (<https://api.frankfurter.app>)
- **Free tier**: ExchangeRate-API (<https://www.exchangerate-api.com>)
- **Paid**: Fixer.io, CurrencyLayer

**Edge Cases**:

- API downtime → Use cached rates or show error
- Rate fluctuations → Use rate at time of entry (historical accuracy)
- User wants to edit entry → Keep original currency, re-convert if needed

**Priority**: Medium (after MVP launch)
