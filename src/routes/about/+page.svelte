<script lang="ts">
  import Card, { Content } from "@smui/card";

  import { _ } from "svelte-i18n";
</script>

<Card padded style="margin: 1rem;">
  <Content>
    <img src="/logo.svg" alt="" />
    <h1>{$_("about app")}</h1>
    <p>Awarie v0.1</p>
    <hr />

    <div class="grid">
      <a href="https://github.com/resultfulness/awarie">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
          />
        </svg>
        {$_("source code")}
      </a>

      <a href="https://github.com/sveltejs/kit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 32 32"
          fill="white"
        >
          <path
            d="M26.1 5.7C23.5 2 18.4.9 14.7 3.2L8.2 7.4c-1.8 1.1-3 2.9-3.4 5c-.3 1.7 0 3.5.8 5.1c-.6.8-.9 1.8-1.1 2.8c-.4 2.1.1 4.3 1.4 6c2.6 3.7 7.7 4.8 11.4 2.5l6.5-4.2c1.8-1.1 3-2.9 3.4-5c.3-1.7 0-3.5-.8-5.1c.6-.8.9-1.8 1.1-2.8c.4-2.1-.1-4.3-1.4-6zM24.3 11c0 .2-.1.4-.2.6l-.1.4l-.3-.2c-.8-.6-1.6-1-2.6-1.3l-.2-.1v-.2c0-.3-.1-.7-.3-1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2L12 12.9c-.3.2-.5.5-.6.9c-.1.4 0 .8.2 1.1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2l2.5-1.6c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1 1 2.4.8 3.6c-.2 1.2-1 2.3-2 3L15.4 26c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.7-1-1-2.4-.8-3.6c0-.2.1-.4.2-.6L8 20l.3.2c.8.6 1.6 1 2.6 1.3l.2.1v.2c0 .3.1.7.3 1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2L20 19c.3-.2.5-.5.6-.9c.1-.4 0-.8-.2-1.1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2l-2.5 1.6c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.8-1-1-2.4-.8-3.6c.2-1.2 1-2.3 2-3l6.5-4.2c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1.1 1 2.4.8 3.6z"
          />
        </svg>
        sveltekit
      </a>

      <a href="https://github.com/hperrin/svelte-material-ui">
        <svg
          width="64"
          height="64"
          viewBox="0 0 7.6963348 10.307724"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="layer1" transform="translate(-44.292905,-72.659666)">
            <text
              xml:space="preserve"
              transform="scale(0.26458333)"
              id="text111"
              style="font-size:53.3333px;font-family:Roboto;-inkscape-font-specification:Roboto;white-space:pre;shape-inside:url(#rect113);fill:#ffffff"
            >
              <tspan x="165.60938" y="313.05669" id="tspan304">
                <tspan style="font-weight:bold" id="tspan302">S</tspan>
              </tspan>
            </text>
          </g>
        </svg>
        svelte material ui
      </a>

      <a href="https://github.com/kaisermann/svelte-i18n">svelte-i18n</a>
    </div>
  </Content>
</Card>

<style lang="scss">
  @use "@material/theme/color-palette" as *;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;

    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      border: 1px solid $grey-800;

      padding-inline: 0.75rem;

      font-size: clamp(0.05rem, 0.5rem + 2vw, 2rem);
      text-align: center;
      text-decoration: none;
      border-radius: 1rem;

      color: $grey-300;

      &:hover,
      &:focus {
        background-color: $grey-800;
      }

      svg {
        display: block;
        width: 100%;
      }

      @media (min-width: 610px) {
        padding: 4rem;
      }
    }
  }
</style>
