<script lang="ts">
  import Card, { Actions, Content } from "@smui/card";
  import IconButton, { Icon } from "@smui/icon-button";

  import { _ } from "svelte-i18n";
  import { reveal } from "svelte-reveal";
  import { fade } from "svelte/transition";

  // temporary report type
  export let report: {
    title: string;
    description: string;
    up: number;
    down: number;
    outdated: number;
    severe: boolean;
  };

  $: voteRatio = 100 * (report.up / (report.up + report.down));

  enum VoteType {
    UP = "up",
    DOWN = "down",
  }

  let voted: VoteType | null = null;

  function handleVote(voteType: VoteType) {
    const unvoteType = voteType === VoteType.UP ? VoteType.DOWN : VoteType.UP;

    if (voted !== voteType) {
      report[voteType] += 1;
      if (voted === unvoteType) {
        report[unvoteType] -= 1;
      }
      voted = voteType;
    } else {
      report[voteType] -= 1;
      voted = null;
    }
  }
</script>

<div use:reveal>
  <Card style="margin: 1rem;">
    <Content>
      <h3 class="mdc-typography--headline4" class:severe={report.severe}>
        {report.title}
      </h3>
      <p class="mdc-typography--subtitle1">{report.description}</p>
    </Content>
    <Actions style="margin-left: auto;">
      {#if voted}
        <small
          transition:fade
          class:positive={voteRatio > 80}
          class:negative={voteRatio < 40}
        >
          {voteRatio.toFixed()}%
        </small>
      {/if}
      {#each Object.values(VoteType) as voteType}
        <IconButton
          on:click={() => handleVote(voteType)}
          style={"font-variation-settings: " +
            (voted === voteType ? "'FILL' 1" : "")}
          aria-label="vote {voteType}"
          title={$_(`vote ${voteType}`)}
        >
          <Icon class="material-symbols-outlined">
            thumb_{voteType}
          </Icon>
        </IconButton>
      {/each}
    </Actions>
  </Card>
</div>

<style lang="scss">
  @use "@material/theme/color-palette" as *;

  h3 {
    border-bottom: 2px solid $grey-800;
  }

  .severe {
    color: $red-500;
  }

  .positive {
    color: $green-200;
  }

  .negative {
    color: $red-200;
  }
</style>
