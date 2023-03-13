<script lang="ts">
  import "./global.scss";
  import Drawer, {
    AppContent,
    Content,
    Header,
    Scrim,
    Subtitle,
    Title as DrawerTitle,
  } from "@smui/drawer";
  import IconButton from "@smui/icon-button";
  import List, { Graphic, Item, Text } from "@smui/list";
  import Menu from "@smui/menu";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";

  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";

  let routes = [
    {
      href: "/",
      name: $_("my_reports"),
      icon_name: "home",
    },
    {
      href: "/about",
      name: $_("about"),
      icon_name: "info",
    },
  ];

  let sidebarOpen = false;

  // set active to currently open page on page open
  let active = routes.filter((route) => route.href === $page.route.id)[0].name;

  function setActive(value: string) {
    sidebarOpen = false;
    active = value;
  }
</script>

<svelte:head>
  <title>{$_("page_title")}</title>
</svelte:head>

<Drawer variant="modal" bind:open={sidebarOpen}>
  <img src="https://unsplash.it/720/480" alt="awarie header" />
  <Header>
    <DrawerTitle>{$_("page_title")}</DrawerTitle>
    <Subtitle>Awarie awaryjne</Subtitle>
  </Header>
  <Content>
    <List>
      {#each routes as { href, name, icon_name }}
        <Item
          {href}
          on:click={() => setActive(name)}
          activated={active === name}
        >
          <Graphic class="material-symbols-outlined" aria-hidden="true">
            {icon_name}
          </Graphic>
          <Text>{name}</Text>
        </Item>
      {/each}
    </List>
    <Menu />
  </Content>
</Drawer>
<Scrim />
<TopAppBar variant="static">
  <Row>
    <Section>
      <IconButton
        class="material-symbols-outlined"
        on:click={() => (sidebarOpen = !sidebarOpen)}
      >
        menu
      </IconButton>
      <Title>{$_("page_title")}</Title>
    </Section>
  </Row>
</TopAppBar>
<AppContent><slot /></AppContent>
