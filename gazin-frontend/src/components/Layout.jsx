import {
  AppShell,
  Header,
  Navbar,
  NavLink,
  Container,
  Flex,
  useMantineColorScheme,
} from "@mantine/core";
import { Icon123, IconCode } from "@tabler/icons-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function Layout() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div>
      <Helmet>
        <title>Gazin Tech</title>
      </Helmet>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            <NavLink
              label="Lista de Desenvolvedores"
              icon={<IconCode size="1rem" stroke={1.5} />}
              variant="subtle"
              to="/developers"
              component={Link}
            />
            <NavLink
              label="Níveis"
              icon={<Icon123 size="1rem" stroke={1.5} />}
              variant="subtle"
              to="/levels"
              component={Link}
            />
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Flex justify="space-between" style={{ width: "100%" }}>
              <Link to="/">
                <img
                  src="https://gazintech.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.0c79ce07.svg&w=750&q=75"
                  alt="Logo"
                  height={40}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
              </Link>
              <Flex>
                {colorScheme === "dark" ? (
                  <IconSun onClick={toggleColorScheme} size={20} />
                ) : (
                  <IconMoon onClick={toggleColorScheme} size={20} />
                )}
              </Flex>
            </Flex>
          </Header>
        }
      >
        <Container fluid>
          <Outlet />
        </Container>
      </AppShell>
    </div>
  );
}
