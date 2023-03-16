<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Select, { Option } from "@smui/select";
  import Switch from "@smui/switch";
  import { locale, locales, _ } from "svelte-i18n";
  import { useDarkMode } from "$lib/stores";

  $: x = $locale as string;

  let value: string = $locale as string;

  function changeLang() {
    if (value !== localStorage.getItem("lang") && value != undefined) {
      locale.set(value);
      localStorage.setItem("lang", value);
      window.location.reload();
    }
  }
</script>

<div class="settings">
  <div class="theme-settings">
    <p>{$_("theme")}</p>
    <Switch bind:checked={$useDarkMode} />
  </div>
  <div class="lang-settings">
    <p>{$_("language_change")}</p>
    <Select bind:value name="langs" label={$_("select_language")}>
      {#each $locales as locale}
        <Option value={locale}>
          {new Intl.DisplayNames([x], { type: "language" }).of(locale)}
        </Option>
      {/each}
    </Select>
  </div>
  <div class="bottom-button">
    <Button
      variant="raised"
      on:click={changeLang}
      style="width: 100%; cursor: pointer;"
    >
      <Label>{$_("save")}</Label>
    </Button>
  </div>
</div>

<style>
  .settings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
  }

  .lang-settings,
  .theme-settings {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
