# Weekly updates (devlog)

How to publish a weekly update on a project in progress, such as the UE5
level. Updates live at `/devlog/<project>/<week>/`, are listed at
`/devlog/<project>/` and `/devlog/`, and can be linked from the project's
case study once it exists.

Nothing is public until the first update has `draft: false`. Before that,
`/devlog/` builds with a "No updates published yet" note, is kept out of
search results and is not in the sitemap.

## Before the first update

1. **Settle the project id and name** in `src/data/devlog.ts`. The id is
   part of every update's URL (`/devlog/ue5-level/week-01/`), so change it
   now if the level gets a name, not after updates are shared.
2. **Week 0 is the kickoff post**: the pitch, the goal, the references and
   the milestone plan, before anything is built. It gives later weeks
   something to be measured against.

## Each week

1. **Copy the template.** `content/devlog/_template.md` →
   `content/devlog/<project>/week-NN.md` (e.g. `week-03.md`). Fill in the
   frontmatter and replace the prompts under each heading. Delete sections
   that don't apply that week.

2. **Add the media** to `public/images/devlog/<project>/`, named in
   lowercase-kebab-case and prefixed with the week (`week-03-overview.mp4`).
   Use MP4 for clips and WebP for stills; every clip needs a first-frame
   poster next to it (`week-03-overview-poster.webp`). With a full ffmpeg
   build:

   ```powershell
   # Clip: H.264, no audio, at most 1280 px wide, starts playing quickly.
   ffmpeg -i capture.mkv -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -vf "scale='min(1280,iw)':-2" -movflags +faststart week-03-overview.mp4

   # Its poster: the first frame.
   ffmpeg -i week-03-overview.mp4 -frames:v 1 -c:v libwebp -quality 82 week-03-overview-poster.webp

   # A still, at most 1920 px wide.
   ffmpeg -i screenshot.png -c:v libwebp -quality 82 -vf "scale='min(1920,iw)':-2" week-03-before.webp
   ```

   In the Markdown, `![alt text](/images/devlog/ue5-level/week-03-overview.mp4 "Caption")`
   puts in a looping clip (or a still for `.webp`). The alt text describes
   it for screen readers; the caption in quotes is optional and shows under it.

3. **Preview it.** `npm run dev` and open `http://localhost:3000/devlog/`.
   Drafts show there with a "Draft" tag.

4. **Check it.** `npm test` validates every update, drafts included: the
   frontmatter, that each week number is used once, and that every image,
   clip and poster exists with the exact file name. `npm run build` must
   pass too.

5. **Publish it.** Set `draft: false`, commit on a branch and open a pull
   request. The Vercel preview of the pull request shows the update as it
   will look live (drafts show on previews too). Merging to `main` puts it
   live.

6. **Share it.** Post on LinkedIn with a link to the update and the lead
   clip, ideally the same day.

## When the case study is ready

Set `caseStudyPath` on the project in `src/data/devlog.ts` (e.g.
`'/portfolio/<level>/'`). Every update and the project's list then link to
it. The case study can show the updates with the `DevlogList` component and
`getDevlogEntries('<project>')`.

## What makes an update worth reading

- **One decision per week, with its reason.** "Moved the checkpoint before
  the second jump because 4 of 5 testers fell there" says more than a list
  of tasks.
- **Show the change.** A clip of the level this week, or a before/after
  pair, near the top.
- **Real numbers only.** Leave a row of the Numbers table empty rather than
  guess.
- **Short.** 300 to 600 words is plenty.
