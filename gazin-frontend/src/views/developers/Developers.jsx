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
  fetchFromApi,
  deleteFromApi,
  fetchFromApiWithSearch,
} from "../../services/apiRequests";

export default function Developers() {
  const { developers, setDevelopers } = useContext(ApplicationState);
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

  const getDevelopers = () => {
    fetchFromApi(`/desenvolvedores/?page=${page}&limit=${perPage}`)
      .then((response) => {
        const { data, meta } = response;
        setDevelopers(data);
        setTotalPages(meta.last_page);
      })
      .catch((error) => console.log(error));
  };

  const deleteDeveloper = async (id) => {
    deleteFromApi(`desenvolvedores/${id}`)
      .then((response) => {
        setIsFail(false);
        setIsSuccess(true);
        start();
        setDevelopers(developers.filter((developer) => developer.id !== id));
      })
      .catch((error) => {
        setIsSuccess(false);
        setIsFail(true);
        start();
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const day = date.getDate();
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  useEffect(() => {
    getDevelopers();
  }, [page, perPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = async () => {
    try {
      const response = await fetchFromApiWithSearch(
        "/desenvolvedores",
        searchQuery
      );
      setDevelopers(response.data);
      setTotalPages(response.meta.last_page);
      setShowClearButton(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowClearButton(false);
    getDevelopers();
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
        <Title order={3}> Lista de Desenvolvedores </Title>
        <Button color="teal" to="/developers/create" component={Link}>
          {" "}
          Incluir Desenvolvedor{" "}
        </Button>
      </Flex>
      <Flex mb={"16px"}>
        <TextInput
          mr={"16px"}
          placeholder="Buscar desenvolvedor"
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
          Desenvolvedor excluído
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
          Ocorreu um erro ao excluir
        </Notification>
      )}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Desenvolvedor</th>
            <th>Nível</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {developers.map((developer) => {
            return (
              <tr key={developer.id}>
                <td>{developer.id}</td>
                <td>{developer.nome}</td>
                <td>{developer.level.nivel}</td>
                <td>{developer.sexo}</td>
                <td>{formatDate(developer.datanascimento)}</td>
                <td>{developer.idade}</td>
                <td>{developer.hobby}</td>
                <td style={{ textAlign: "center" }}>
                  <ActionIcon
                    color="blue"
                    variant="outline"
                    to={`/developers/update/${developer.id}`}
                    component={Link}
                  >
                    <IconEdit size="1.125rem" />
                  </ActionIcon>
                </td>
                <td style={{ textAlign: "center" }}>
                  <ActionIcon
                    color="red"
                    variant="outline"
                    onClick={() => deleteDeveloper(developer.id)}
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
