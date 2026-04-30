# Security Specification - ACRO Apgujeong Reservation

## 1. Data Invariants
- A reservation slot count must be an integer between 0 and 10.
- `updatedAt` must always be the server time.
- Settings must contain a valid phone number string.
- Only authenticated admins can modify counts or settings.
- Anyone can read the reservation status and contact info.

## 2. Dirty Dozen Payloads (Targeting /slots/slotId)

1. **Anonymous Write**: Attempt to update count without login. -> REJECTED (isSignedIn() required via isAdmin())
2. **Identity Spoofing**: Logged in non-admin trying to update count. -> REJECTED (isAdmin() check)
3. **Capacity Overflow**: Admin trying to set count to 11. -> REJECTED (count <= 10)
4. **Capacity Underflow**: Admin trying to set count to -1. -> REJECTED (count >= 0)
5. **Ghost Field Injection**: Admin adding `verified: true` to a slot. -> REJECTED (key size check)
6. **Time Spoofing**: Admin sending a client-side `updatedAt` timestamp. -> REJECTED (updatedAt == request.time)
7. **Type Poisoning**: Sending `count: "10"` (string instead of int). -> REJECTED (is int)
8. **Malicious ID**: Attempting to write to `/slots/../../illegal_path`. -> REJECTED (Path structure)
9. **Setting Hijack**: Non-admin trying to change the branch phone number. -> REJECTED (isAdmin())
10. **Admin Self-Promotion**: User trying to write to `/admins/{myUid}`. -> REJECTED (admins write: false)
11. **Phone Number Overflow**: Setting a 1MB string as phone number. -> REJECTED (size <= 20)
12. **Metadata Tampering**: Trying to update a slot but omitting `updatedAt`. -> REJECTED (hasAll check)

## 3. Test Cases (Drafting firestore.rules.test.ts)
(To be implemented in the next step)
