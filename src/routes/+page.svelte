<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Fab, { Icon } from "@smui/fab";
  import ReportComponent from "./ReportComponent.svelte";

  let mock_reports = [
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
    {
      name: "Wyjebało studzienkę",
      description: "Naprawdę",
      up: 4,
      down: 0,
      outdated: 0,
      severe: true,
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo modi similique harum accusamus reiciendis suscipit qui?",
      up: 1,
      down: 0,
      outdated: 0,
      severe: false,
    },
  ];

  let dialogOpen = false;

  function handleAdd() {
    dialogOpen = true;
  }
</script>

<Dialog bind:open={dialogOpen}>
  <Title>Dodaj awarię</Title>
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

{#each mock_reports as report}
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
