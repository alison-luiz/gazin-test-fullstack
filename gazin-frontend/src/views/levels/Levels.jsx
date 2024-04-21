import {
  ActionIcon,
  Button,
  Flex,
  Notification,
  Table,
  Title,
  TextInput,
} from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import { IconCheck, IconEdit, IconTrashX, IconX } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationState from "../../state/ApplicationState";
import {
  deleteFromApi,
  fetchFromApi,
  fetchFromApiWithSearch,
} from "../../services/apiRequests";

export default function Levels() {
  const { levels, setLevels } = useContext(ApplicationState);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showClearButton, setShowClearButton] = useState(false);

  const { start } = useTimeout(() => {
    setIsSuccess(false);
    setIsFail(false);
  }, 3000);

  const getLevels = () => {
    fetchFromApi(`/niveis?page=${page}&limit=${perPage}`)
      .then((response) => {
        const { data, meta } = response;
        setLevels(data);
        setTotalPages(meta.last_page);
      })
      .catch((error) => console.log(error));
  };

  const deleveLevel = async (id) => {
    deleteFromApi(`niveis/${id}`)
      .then((response) => {
        setIsFail(false);
        setIsSuccess(true);
        start();
        setLevels(levels.filter((level) => level.id !== id));
      })
      .catch((error) => {
        setIsSuccess(false);
        setIsFail(true);
        start();
      });
  };

  useEffect(() => {
    getLevels();
  }, [page, perPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = async () => {
    try {
      const response = await fetchFromApiWithSearch("/niveis", searchQuery);
      setLevels(response.data);
      setTotalPages(response.meta.last_page);
      setShowClearButton(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowClearButton(false);
    getLevels();
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === page}
          style={{ marginLeft: 5 }}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <Flex mb={"16px"} justify="space-between">
        <Title order={3}> Níveis </Title>
        <Button color="teal" to="/levels/create" component={Link}>
          {" "}
          Incluir Nível{" "}
        </Button>
      </Flex>
      <Flex mb={"16px"}>
        <TextInput
          mr={"16px"}
          placeholder="Buscar nível"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setShowClearButton(event.target.value.length > 0);
          }}
        />
        <Button mr={"8px"} onClick={handleSearch}>
          Buscar
        </Button>
        {showClearButton && (
          <Button onClick={handleClearSearch} color="red">
            Limpar
          </Button>
        )}
      </Flex>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Feito!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          O nível foi excluído
        </Notification>
      )}
      {isFail && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          title="Ocorreu um Erro!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Não foi possível excluir
        </Notification>
      )}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nível</th>
            <th>Qtde. de Desenvolvedores</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => {
            return (
              <tr key={level.id}>
                <td>{level.id}</td>
                <td>{level.nivel}</td>
                <td>{level.developers.length}</td>
                <td style={{ textAlign: "center" }}>
                  <ActionIcon
                    color="blue"
                    variant="outline"
                    to={`/levels/update/${level.id}`}
                    component={Link}
                  >
                    <IconEdit size="1.125rem" />
                  </ActionIcon>
                </td>
                <td style={{ textAlign: "center" }}>
                  <ActionIcon
                    color="red"
                    variant="outline"
                    onClick={() => deleveLevel(level.id)}
                  >
                    <IconTrashX size="1.125rem" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Flex mt={16} mr={16} justify="flex-end">
        {renderPaginationButtons()}
      </Flex>
    </div>
  );
}
