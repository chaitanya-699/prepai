The page uses a dark neo-brutalist tech/EdTech style: deep navy-black surfaces, soft pastel accents, square edges, hard offset shadows, thin cool-purple borders, light grain, and slightly rotated “sticker” cards.
Core theme palette
Role	Hex	Use
Main background / Ink	#0E0F1B	Page background
Primary surface	#16172A	Cards and panels
Secondary surface	#1C1D34	Raised panel variation
Main border	#383A5F	Dividers, card borders
Primary text	#F5F4FF	Headlines and key UI text
Secondary text	#AEB4EE	Descriptions, navigation
Lime accent	#C6E875	Main CTA, highlights, active states
Violet accent	#A992FF	Shadows, progress, badges
Blue accent	#8EB8FF	Supporting badges and data visuals
Peach accent	#FFB48C	Supporting badges, stickers
Soft white	#F2F3FF	Alternate light text
Hard shadow	#0A0B13	Offset card shadows

Supporting shades used in the page
:root {
  /* Dark backgrounds */
  --ink: #0E0F1B;
  --shadow: #0A0B13;
  --surface-deep: #111222;
  --surface-ticker: #141524;
  --surface-card: #16172A;
  --surface-cta: #17182B;
  --surface-visual: #17182C;
  --surface-option: #1A1B30;
  --surface-window: #1B1C31;
  --surface-raised: #1C1D34;
  --surface-hover: #20213A;
  --surface-cta-card: #21223B;

  /* Borders and interface detail */
  --border-subtle: #303252;
  --border: #383A5F;
  --border-option: #3C3F64;
  --border-grid: #424568;
  --border-muted: #555883;
  --border-strong: #565A87;
  --border-code: #626695;
  --border-cta: #696D99;
  --progress-track: #292B49;
  --code-line: #2E3150;
  --window-dot: #5E6189;

  /* Text hierarchy */
  --text: #F5F4FF;
  --text-soft-white: #F2F3FF;
  --text-option: #DFE1F5;
  --text-bright-muted: #BFC3EB;
  --text-muted: #AEB4EE;
  --text-subtle: #969BC9;
  --text-trust: #8E94C9;
  --text-note: #8F94C6;
  --text-code: #8288BD;

  /* Accent system */
  --lime: #C6E875;
  --lime-light: #DFF99E;
  --lime-pale: #E8FFAC;
  --lime-surface: #EFFFC1;

  --violet: #A992FF;
  --violet-pale: #CFC4FF;
  --violet-dark: #6457AA;

  --blue: #8EB8FF;

  --peach: #FFB48C;
  --peach-light: #FFDAA5;

  /* Dark text placed over light accents */
  --on-accent: #101123;
  --on-lime: #111224;
  --on-badge: #151622;
  --on-option-active: #141521;
  --on-violet: #171425;
  --on-peach: #221A1F;
}
Opacity effects
--header-bg: rgba(14, 15, 27, 0.87);
--header-border: rgba(174, 180, 238, 0.18);

--violet-ring-1: rgba(169, 146, 255, 0.05);
--violet-ring-2: rgba(169, 146, 255, 0.03);
--violet-display: rgba(169, 146, 255, 0.38);

--lime-decoration: rgba(198, 232, 117, 0.30);
--muted-border: rgba(174, 180, 238, 0.16);

--grid-ring-1: rgba(85, 88, 131, 0.16);
--grid-ring-2: rgba(85, 88, 131, 0.08);
Design rules to keep the whole project consistent
Use #0E0F1B as the default app background—avoid pure black.
Keep cards square (border-radius: 0), with 1px purple-navy borders.
Use hard shadows instead of soft blur: 7px 7px 0 #0A0B13 or 5px 5px 0 #A992FF.
Make lime the action color: primary buttons, selected answers, progress completion, active hover emphasis.
Reserve violet for decorative depth: shadows, underlines, charts, badges, rings.
Use blue and peach sparingly as secondary category/status colors.
Use bold, tightly tracked headings: font-weight: 900; letter-spacing: -0.05em to -0.075em.
Use Inter or a similar modern grotesk sans-serif.
Add a very subtle grain overlay and faint geometric shapes/grid lines to prevent flatness.
On hover, move components slightly up-left (translate(-2px, -2px)) and reveal a colored hard shadow.
Add occasional rotate(-1deg to 10deg) to hero cards, stickers, or data widgets—never every component.
The resulting style can be described as: “Dark pastel neo-brutalist SaaS with technical-dashboard energy.”
