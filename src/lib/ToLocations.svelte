<script>
  import Button, { Icon, Label } from "@smui/button";

  import { _ } from "svelte-i18n";
</script>

<div class="no-reports">
  <p style="color: #aaa">{$_("you did not choose any locations yet")}</p>
  <Button href="/locations">
    <Icon class="material-symbols-outlined">location_on</Icon>
    <Label>{$_("click here to choose")}</Label>
  </Button>
</div>

<style>
  .no-reports {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
