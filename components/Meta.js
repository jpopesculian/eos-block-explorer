import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Roboto');

      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure,
      footer, header, hgroup, menu, nav, section {
        display: block;
      }
      body {
        line-height: 1.5;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      // TYPOGRAPHY

      body {
        font-family: 'Roboto', sans-serif;
        color: #333;
      }

      h1 {
        font-size: 2em;
      }

      h2 {
        font-size: 1.5em;
      }

      h3 {
        font-size: 1.17em;
      }

      h4 {
        font-size: 1em;
      }

      a {
        text-decoration: none;
        color: #333;
      }
    `}</style>
  </div>
)
