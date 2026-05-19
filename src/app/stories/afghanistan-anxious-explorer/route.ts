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
  body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
  -moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
  -ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
  animation:-amp-start 8s steps(1,end) 0s 1 normal both}
  @-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
  @keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
</style>

<noscript>
  <style amp-boilerplate>
    body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
  </style>
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
  publisher-logo-src="https://stories.jamesmerriman.co.uk/stories/logo.png"
  poster-portrait-src="https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/cover.jpg">
    
  <amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
      <amp-img src="https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/cover.jpg"
        width="720" height="1280" layout="responsive"></amp-img>
    </amp-story-grid-layer>
    <!-- ✅ Overlay -->
    <amp-story-grid-layer template="fill">
      <div class="overlay"></div>
    </amp-story-grid-layer>

    <!-- ✅ Text -->
    <amp-story-grid-layer template="vertical">
      <h1>Afghanistan</h1>
      <p>What you don’t expect</p>
    </amp-story-grid-layer>

  </amp-story-page>


<!-- REPEATED PAGES -->
${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  .map((i, idx) => {
    const text = [
      "Travel begins with hesitation.",
      "Not fear — awareness.",
      "Arrival is quiet.",
      "Life moves beyond headlines.",
      "Journeys stretch. Time shifts.",
      "The streets never stop.",
      "Encounters are brief — never empty.",
      "The mountains define everything.",
      "The tension never leaves.",
      "What matters isn’t always visible.",
    ][idx];

    return `
  <amp-story-page id="page-${i}">
    <amp-story-grid-layer template="fill">
      <amp-img src="https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/${i}.jpg"
        width="720" height="1280" layout="responsive"></amp-img>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="fill">
      <div class="overlay"></div>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <p animate-in="fade-in">${text}</p>
    </amp-story-grid-layer>
  </amp-story-page>`;
  })
  .join("")}

<!-- CTA -->
<amp-story-page id="cta">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://stories.jamesmerriman.co.uk/stories/afghanistan-anxious-explorer/images/14.jpg"
      width="720" height="1280" layout="responsive"></amp-img>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="fill">
    <div class="overlay"></div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h2>See the full story</h2>
    <p><a href="https://www.jamesmerriman.co.uk">Explore more →</a></p>
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
