# Legacy documents mirrored from gtmc.edu.in

Source files for the IQAC / NIRF / AQAR pages, downloaded from the old site
(www.gtmc.edu.in) so they can be re-uploaded without depending on that server —
it only speaks TLS 1.0 and is not reliably reachable from modern clients.

Upload them to Cloudinary and attach them to the matching pages with:

    npx tsx prisma/seed-dynamic-pdfs.ts

The mapping of file -> page lives in that script. Re-running is safe: uploads are
keyed by a stable public_id, so files are overwritten rather than duplicated.

Note: Cloudinary must have PDF/ZIP delivery enabled for these to be viewable
(Settings -> Security -> Restricted media types -> uncheck "PDF and ZIP files").

## What is NOT here

The old site publishes nothing newer than these. There is no AQAR for 2021-22
through 2025-26 (only 2017-18 .. 2020-21 exist), and the newest NIRF submission
is "NIRF College 2025". Newer years should be added through the admin panel at
/admin/dynamic-sections as the college publishes them.
