# Star Cafe — Claude Code Project Brief

> **Purpose:** Build a polished, portfolio-quality website for a fictional cafe brand called **Star Cafe**. Treat this document as the source of truth for product, design, and implementation decisions.

## 1. Your role and working rules

Act as a senior product designer and frontend engineer. First inspect the existing repository and the `Inspirations/` directory, then implement the website in the project itself.

- Reuse the project's existing setup when it is healthy. If it is empty, initialize the stack described below.
- Do not stop after writing a plan or a mockup. Build the working website, run it, inspect it, and fix issues.
- Keep the implementation maintainable: small components, clear naming, typed data, and no unnecessary abstraction.
- Do not claim a command, test, or visual check succeeded unless you actually ran it.
- If something is ambiguous, make a considered design decision consistent with this brief rather than blocking on minor questions.

## 2. Brand and concept

**Brand name:** Star Cafe  
**Brand type:** Entirely fictional, general-purpose cafe concept created for a design portfolio.

The site should communicate a distinctive idea: **coffee, considered alongside the space it is enjoyed in**. Star Cafe is not just a menu page; its visual signature is a beautifully presented coffee cup and an interactive demonstration of how natural light changes the cafe's architecture throughout the day.

Invent only clearly fictional brand copy and product names. Do not imply that Star Cafe is a real business, and do not introduce real addresses, real founders, real awards, real customer testimonials, real reviews, factual claims about sourcing, or unverifiable sustainability/health claims. Avoid references to real cafes or other businesses. Do not use filler text, including “Lorem ipsum,” fake contact details, or fake statistics.

Suggested brand language:
- **Primary headline:** “A little more light in every cup.”
- **Supporting line:** “Thoughtful coffee. A space that changes with the day.”
- **Brand principle:** “Good coffee, beautiful light, room to stay.”
These are creative copy suggestions, not factual claims.

## 3. Recommended technology

Use the following unless the repository already has an equally suitable working stack:

- **Next.js** with the App Router
- **TypeScript**
- **Tailwind CSS**
- **Motion for React** (`motion`) for tasteful UI animation
- **Lucide React** for interface icons
- CSS 3D transforms, layered SVG, or a lightweight canvas for the architectural daylight experience

Use Three.js / React Three Fiber only if the repository and assets make a genuine 3D scene practical. Do not add a large 3D dependency just to create a decorative effect. A high-quality, art-directed CSS/SVG scene with responsive lighting layers is preferable to a broken or slow 3D scene.

Use the package manager already represented by the repository lockfile. If starting from an empty directory, use npm unless there is a clear reason not to.

## 4. Inspiration assets

Inspect the supplied assets in the `Inspirations/` folder before implementation. The folder may contain screenshots, images, and a video. Review the available files and, if possible, extract representative frames from the video.

Use the references for **design principles**, not as templates to copy:
- Editorial layouts with confident typography and generous whitespace
- Product-focused hero compositions with a large central object and concise callouts
- Strong, deliberate typography and restrained but vivid accent colors
- Layered product imagery, asymmetrical grids, and carefully cropped photography
- Interactive product/feature sections and clear content hierarchy
- Warm, tactile surfaces contrasted with clean modern interface elements
- Carefully composed full-page rhythm, including a strong footer

Do not reproduce the reference brands, their exact copy, logos, products, layouts, or identifiable visual assets. The result must feel like an original Star Cafe design.

## 5. Visual direction

Create a premium, contemporary cafe identity: warm, tactile, architectural, quietly playful, and highly art-directed. Avoid a generic cafe template, a stock-dashboard appearance, or a wall of identical rounded cards.

### Palette

Define a coherent set of CSS variables and use them consistently. A starting direction:

- Warm cream / oat background: `#F5F0E7`
- Espresso ink: `#211B17`
- Coffee brown: `#6E4630`
- Caramel accent: `#D98A45`
- Muted sage: `#9BA58A`
- Soft pale blue for daylight: `#DCE7E8`
- White: `#FFFDF9`

Adjust the palette after reviewing the inspiration assets. Ensure all text/background combinations meet WCAG AA contrast where applicable. Use accent colors with restraint.

### Typography

Use a distinctive display face paired with a legible sans-serif. Prefer a reliable, locally available or properly loaded font source. Avoid using more than two font families. Use large editorial headlines, tight but readable line lengths, clear hierarchy, and responsive type scaling with `clamp()`.

### Layout and motion

- Use a centered content grid with deliberate changes in density.
- Make desktop feel art-directed rather than merely stretched mobile.
- Use subtle transitions, gentle parallax only when it improves the experience, and motion that respects `prefers-reduced-motion`.
- Avoid excessive blur, glassmorphism, glowing gradients, noisy backgrounds, and gratuitous scroll-jacking.
- Do not use emojis as interface icons.
- Do not make every section a rounded rectangle.

## 6. Required page structure

Build a complete, responsive single-page homepage. A multi-page structure is not necessary unless the existing project already uses it. Navigation must work.

### A. Header / navigation

- Star Cafe wordmark, created as text or a simple original CSS/SVG mark.
- Navigation links to the actual sections on the page, such as **The Coffee**, **The Space**, **Our Approach**, and **Visit**.
- A prominent but tasteful CTA such as **Explore the space** or **See the menu**.
- Functional mobile menu with accessible open/close behavior, keyboard support, and correct `aria-expanded` state.
- Header may become sticky if it supports the experience; ensure it does not obscure section headings.

### B. Hero: the coffee cup is the star

This is the most important visual moment. The first viewport must feature a large, beautifully lit coffee cup as the central hero object. Do not make the hero only a headline with a small cup image beside it.

Composition guidance:
- Place the cup centrally or slightly off-center, with oversized typography and a clear focal hierarchy.
- Use a real image asset from the supplied inspirations only if it is appropriate and licensed/available for reuse in this local project. Otherwise create a convincing original composition with CSS/SVG and available project assets; do not hotlink random image URLs.
- Make the cup feel tactile through a carefully chosen shadow, highlights, steam, saucer, or surrounding light. Keep effects believable.
- Add **2–4 short callouts** around the cup, connected with subtle leader lines or small markers. Example fictional feature language:
  - “A slower kind of morning”
  - “Roasted for the moment”
  - “A seat in the sunlight”
  - “Stay for one more chapter”
  These are expressive brand statements, not measurable factual promises.
- Headline and CTA must remain legible and must not collide with the cup at common screen widths.
- Include a clear next action, such as **Discover the space**, that scrolls to the architectural section.
- If using a hero image, set dimensions/aspect ratio, responsive sizing, meaningful alt text, and a graceful fallback.

### C. Small brand introduction / signature details

Introduce Star Cafe in concise, specific copy. Use an editorial layout, a small set of signature offerings, or typographic statements. Avoid fake popularity indicators, star ratings, “best in town” claims, or invented sales figures.

Possible fictional menu items, if useful:
- **The House Cup** — espresso, steamed milk, and a soft cocoa finish.
- **Golden Hour** — a warm, mellow latte-inspired signature.
- **Night Shift** — a deeper, bolder espresso-based drink.
- **Something on the Side** — a rotating pastry pairing.

Treat these as invented menu concepts. Do not imply they are available at a real venue. Keep descriptions appetizing but not medical or health-related.

### D. Interactive architecture and daylight studio — essential feature

This section is a defining part of the website, not a minor decorative widget. Build an interactive architectural room scene that shows how the cafe's interior and sunlight change through the day.

**Required interaction:** a time-of-day slider controls the sun position and the direction, length, warmth, and intensity of light inside the room.

Suggested controls and behavior:
- Slider spanning **06:00–20:00**, with a visible formatted time label (for example, “09:30 AM”).
- Keyboard-operable native range input with a visible label and focus state.
- As the slider changes:
  - Move the sun/light source across a sky or window region.
  - Rotate/change the angle of sunbeams entering the room.
  - Change the length and direction of shadows across the floor and furniture.
  - Shift ambient/background colors from cool morning light to warm late-afternoon light and then softer evening light.
  - Adjust the brightness and color temperature of selected surfaces.
  - Update a concise scene caption, such as “Morning — soft light reaches the window seats.”
- Add a few selectable room details or scene labels only if they are genuinely interactive and useful.
- Provide a **Reset to morning** or **Reset time** button if it improves usability.
- Make the change visible even on mobile. The room can simplify on narrow screens, but the time slider must remain functional.

Implementation approach:
- Prefer a custom CSS/SVG architectural illustration composed of a window, wall planes, floor, table, chair, plant, and a few recognizable cafe details.
- Use CSS custom properties for time-derived values (sun X/Y, light angle, warmth, brightness, shadow scale/opacity). Interpolate smoothly as the slider moves.
- Use layered gradients and pseudo-elements for sunlight shafts, with `pointer-events: none` on decorative overlays.
- Use a simple deterministic function mapping slider minutes to scene variables. No network calls are needed.
- Keep scene geometry and lighting internally consistent. Avoid a random background image with a slider that does not actually affect the scene.
- If a proper 3D renderer is practical, use it only if it remains fast, responsive, and robust. Always provide a fallback scene if WebGL is unavailable.
- Make the scene's fictional nature clear through brand presentation; do not label it as a real floor plan or a factual architectural simulation.

### E. Coffee / menu feature section

Show a small, well-designed set of fictional drinks or cafe rituals. Use a distinctive grid or editorial menu layout rather than generic ecommerce cards. Each item should have:
- A clear name
- A short original description
- A purposeful visual or graphic
- Optional price only if it is clearly presented as an illustrative fictional menu price. Prefer omitting prices if they add no design value.

Avoid claims such as “100% organic,” “locally sourced,” “carbon neutral,” “award-winning,” or specific origin/roast claims unless the project provides evidence. Do not invent allergens or dietary certifications.

### F. Design principles / cafe atmosphere

Include a section that communicates the experience through three or four clear principles, for example:
- **Light, not glare** — a place designed around the changing day.
- **Room to linger** — comfortable spaces for conversation or quiet focus.
- **Details that matter** — considered textures, materials, and small rituals.
- **Coffee without the ceremony** — approachable language and an inviting atmosphere.

Use original copy and meaningful visuals. These are brand values, not independently verified claims.

### G. Closing CTA and footer

- Strong closing section with a clear invitation such as **Find your kind of quiet** or **Step into the light**.
- CTA must lead to a real section on the page or a clearly implemented interaction.
- Footer should include the Star Cafe wordmark, in-page navigation, and a concise fictional-brand statement.
- Do not invent a street address, phone number, business email, opening hours, map, or social account. If a contact interaction is useful, implement a local form with clear demo behavior and honest confirmation, or omit it.
- No dead `href="#"` links. Use real in-page anchors, working buttons, or omit the control. Every interactive element must do what its label promises.

## 7. Functionality and quality requirements

### Responsive behavior
Test at least:
- 360–390 px mobile width
- 768 px tablet width
- 1280–1440 px desktop width

Prevent horizontal overflow. Recompose layouts for mobile rather than merely shrinking desktop elements. Ensure hero callouts, the cup, slider, and room scene remain usable.

### Accessibility
- Semantic landmarks and heading order
- Visible keyboard focus
- Accessible names for all controls
- Correct labels and ARIA state for the mobile menu
- Sufficient contrast
- Useful alt text for informative images; empty alt for decorative images
- Reduced-motion support
- Do not communicate slider state through color alone
- No auto-playing audio or video

### Performance
- Avoid unnecessary client components and large dependencies.
- Keep the daylight interaction local and deterministic.
- Use Next.js image/font best practices where relevant.
- Prevent layout shift by reserving media dimensions.
- Avoid large unoptimized background images.
- Keep animation smooth and do not animate expensive properties when a transform/opacity will work.

### SEO and metadata
- Give the page an original title and description, e.g. title “Star Cafe — Coffee in a Different Light”.
- Add appropriate Open Graph metadata without claiming a real location.
- Set a favicon or simple original mark if the project setup supports it.
- Include a sensible theme color.
- Do not add fake LocalBusiness structured data or fake addresses/reviews.

### Link integrity
- Inspect every link and button.
- Internal links must resolve to existing section IDs or routes.
- External links should only be included when necessary and verified; this project can avoid external links entirely.
- Do not hotlink images from random websites.
- Do not use placeholder `href="#"`, dead CTA buttons, empty click handlers, or fake social links.

## 8. Suggested component structure

Adapt to the repository, but aim for a clear structure such as:

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  site-header.tsx
  hero-cup.tsx
  callout.tsx
  brand-intro.tsx
  daylight-studio.tsx
  signature-menu.tsx
  cafe-principles.tsx
  closing-cta.tsx
  site-footer.tsx
public/
  images/
```

Use server components by default. Make only genuinely interactive pieces client components, especially the daylight slider and mobile navigation. Keep menu and principle content in typed data arrays when that improves clarity.

## 9. Implementation sequence

1. **Inspect:** list the repository files, inspect `package.json`, identify the package manager, and inspect every file in `Inspirations/`. Review the video if a playable/extractable asset is present. Do not assume the folder's exact filenames.
2. **Plan:** briefly decide the page composition, typography, image strategy, and how the daylight scene will work. Then continue implementation without waiting for approval.
3. **Set up:** configure Next.js, TypeScript, Tailwind, fonts, and linting as needed. Avoid replacing healthy existing configuration without reason.
4. **Build the visual system:** define CSS variables, type scale, spacing, layout primitives, buttons, and responsive rules.
5. **Implement sections:** build the header, coffee-cup hero with callouts, brand introduction, interactive daylight room, menu, principles, closing CTA, and footer.
6. **Implement real interactions:** working navigation, mobile menu, time slider, changing light/shadow scene, and any additional controls.
7. **Verify:** run the available lint, typecheck, and production build commands. Start the development server and use browser/computer tooling if available to inspect the page at desktop and mobile sizes.
8. **Polish:** fix console errors, layout overflow, poor contrast, broken links, visual collisions, and reduced-motion issues. Check that the room scene changes meaningfully at morning, midday, and evening slider values.
9. **Report:** summarize what was built, the commands actually run, any checks that passed or failed, and anything that still needs attention. Do not claim visual/browser testing if it was not performed.

## 10. Acceptance checklist

The work is complete only when all applicable items below are true:

- [ ] A cohesive, original Star Cafe homepage is implemented in the repository.
- [ ] The first viewport features a prominent coffee cup with concise surrounding callouts.
- [ ] The design clearly draws inspiration from the supplied assets without copying a reference site.
- [ ] The interactive room scene visibly changes sun position, lighting warmth, and shadows as the time slider moves.
- [ ] The time control is accessible and usable on mobile and desktop.
- [ ] Every section has final, original copy; there is no Lorem Ipsum or filler.
- [ ] There are no invented real-world facts, real business references, fake reviews, fake addresses, or unsupported claims.
- [ ] All links and buttons work; there are no placeholder `href="#"` links.
- [ ] Mobile navigation works and no tested viewport has unintended horizontal overflow.
- [ ] Motion respects `prefers-reduced-motion`.
- [ ] Metadata is present and does not misrepresent the fictional brand as a real venue.
- [ ] Lint/typecheck/build have been run where configured, and failures are reported honestly.
- [ ] The final result has been visually checked where tooling permits.

## Final instruction

Prioritize **visual craft, a memorable coffee-cup hero, and the interactive daylight architecture scene**. The website should feel like a finished, bespoke portfolio project—not a generic cafe starter template. Make sensible creative decisions, build the actual working site, and verify the result.
