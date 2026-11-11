# Homepage social preview

- `ravi-calling-card.mp4`: silent eight-second loop, 1200 × 630, 30 fps, H.264/yuv420p, fast-start MP4. All four illustrations animate continuously together: bicycle wheels and pedals turn, a book page gently turns back and forth, handstand push-ups repeat, and subway windows glide beneath stationary New York buildings. The name and URL remain fixed. Bike and push-up cycles take four seconds, the page takes eight, and the subway window pattern takes two, meeting smoothly at the loop boundary. The push-ups retain planted palms, bending elbows, constant arm lengths, and no leg kick.
- `ravi-calling-card.png`: matching 1200 × 630 static fallback.

The homepage declares absolute HTTPS Open Graph media URLs. Its X/Twitter card uses the static image. No video or autoplay is added to the visible homepage; sharing applications decide whether to play the Open Graph video. Playback and cache behavior must be checked in each target sharing application, not inferred from these tags.

The artwork is original vector artwork. The rendered lettering uses Playfair Display and JetBrains Mono, licensed under the SIL Open Font License; no font software is included in these media files.

When replacing the media, keep the metadata dimensions and MIME types in `index.html` synchronized, verify both URLs return the correct files, and preserve a static fallback.
