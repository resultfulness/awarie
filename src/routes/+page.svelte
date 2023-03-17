<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import Fab, { Icon } from "@smui/fab";
  import ReportComponent from "./ReportComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const reports = data.reports;

  let dialogOpen = false;

  function handleAdd() {
    dialogOpen = true;
  }
</script>

<Dialog bind:open={dialogOpen}>
  <Title>Lorem, ipsum.</Title>
  <Content>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quia?
  </Content>
  <Actions>
    <Button on:click={() => void 0}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => void 0}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>

<div class="fab">
  <Fab color="primary" on:click={handleAdd}>
    <Icon class="material-symbols-outlined">add</Icon>
  </Fab>
</div>

{#each reports as report}
  <ReportComponent {report} />
{/each}

<style>
  .fab {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }
</style>
