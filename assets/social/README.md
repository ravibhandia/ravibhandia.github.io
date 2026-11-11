# Homepage social preview

- `ravi-calling-card.mp4`: silent eight-second loop, 1200 × 630, 30 fps, H.264/yuv420p, fast-start MP4. The bicycle wheels and pedals, book, handstand push-up, and New York scene move gently in sequence; the name and URL remain fixed. The push-up lowers, pauses just above the floor, and presses back to straight arms with fixed palms and no leg kick.
- `ravi-calling-card.png`: matching 1200 × 630 static fallback.

The homepage declares absolute HTTPS Open Graph media URLs. Its X/Twitter card uses the static image. No video or autoplay is added to the visible homepage; sharing applications decide whether to play the Open Graph video. Playback and cache behavior must be checked in each target sharing application, not inferred from these tags.

The artwork is original vector artwork. The rendered lettering uses Playfair Display and JetBrains Mono, licensed under the SIL Open Font License; no font software is included in these media files.

When replacing the media, keep the metadata dimensions and MIME types in `index.html` synchronized, verify both URLs return the correct files, and preserve a static fallback.
