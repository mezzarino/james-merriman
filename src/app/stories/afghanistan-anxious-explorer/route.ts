export const dynamic = "force-static";

export async function GET() {
  return new Response(
    `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <title>Afghanistan: The Anxious Explorer</title>
  <link rel="canonical" href="https://www.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>

  <style amp-boilerplate>
    body { visibility: hidden }
  </style>
  <noscript>
    <style amp-boilerplate>body { visibility: visible }</style>
  </noscript>

  <style amp-custom>
    body { margin: 0; }
    h1, h2, p {
      font-family: Georgia, serif;
      color: white;
      text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    h1 { font-size: 3rem; }
    h2 { font-size: 1.6rem; }
    p { font-size: 1.2rem; }

    amp-story-grid-layer[template="vertical"] {
      padding: 2rem;
      justify-content: flex-end;
    }

    .overlay {
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.8),
        rgba(0,0,0,0.3),
        rgba(0,0,0,0.05)
      );
    }
  </style>
</head>

<body>

<amp-story
  standalone
  title="Afghanistan: The Anxious Explorer"
  publisher="James Merriman"
  publisher-logo-src="https://www.jamesmerriman.co.uk/logo.png"
  poster-portrait-src="https://<amp-story-grid-layer template="fill">
    <div class="overlay"></div>
  </amp-story-grid-layer>

  <amp-story-grid-layer template="vertical">
    <h1>Afghanistan</h1>
    <p>What you don’t expect</p>
  </amp-story-grid-layer>
</amp-story-page>

</amp-story>

</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
