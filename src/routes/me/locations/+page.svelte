<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import IconButton from "@smui/icon-button";
  import List, { Item, Label as ListLabel } from "@smui/list";

  import ToLocations from "$lib/ToLocations.svelte";

  import { _ } from "svelte-i18n";

  let open = false;
  let toRemove: number;

  let myPlaces: number[] = (
    JSON.parse(localStorage.getItem("userLocationIDs") as string) || []
  ).sort();

  function handleRemove() {
    myPlaces = myPlaces.filter((p) => p !== toRemove);
    localStorage.setItem("userLocationIDs", JSON.stringify(myPlaces));
  }
</script>

<header>
  <h2 class="mdc-typography--headline5">{$_("your report locations")}</h2>
</header>
<hr />
<List>
  {#if myPlaces.length === 0}
    <ToLocations />
  {:else}
    {#each myPlaces as place}
      <Item
        style="display: flex; justify-content: space-between; align-items: center;"
        on:click={() => {
          open = true;
          toRemove = place;
        }}
      >
        <ListLabel style="padding-left: 1rem;">{place}</ListLabel>
        <IconButton class="material-symbols-outlined" style="color: red;">
          close
        </IconButton>
      </Item>
    {/each}
  {/if}
</List>
<Dialog
  bind:open
  aria-labelledby="removal-info-title"
  aria-describedby="removal-info-desc"
>
  <Title id="removal-info-title">
    {$_("you are about to remove")}
    {toRemove}
  </Title>
  <Content id="removal-info-desc">{$_("are you sure")}?</Content>
  <Actions>
    <Button>
      <Label>{$_("no")}</Label>
    </Button>
    <Button on:click={handleRemove}>
      <Label>{$_("yes")}</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  header {
    padding: 2rem;
  }
</style>
