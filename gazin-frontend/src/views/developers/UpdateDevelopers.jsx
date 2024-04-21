import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeveloperForm from "../../components/DeveloperForm";
import { editResource, fetchFromApiById } from "../../services/apiRequests";

export default function UpdateDevelopers() {
  const [developer, setDeveloper] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const { id } = useParams();
  const url = `/desenvolvedores/${id}`;

  const onSubmit = async (values) => {
    await editResource(url, values)
      .then((response) => {
        setIsFail(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      })
      .catch((error) => {
        setIsSuccess(false);
        setIsFail(true);
        setTimeout(() => setIsFail(false), 3000);
      });
  };

  useEffect(() => {
    const getDevelopers = async () => {
      const data = await fetchFromApiById(url);
      setDeveloper(data);
    };
    getDevelopers();
  }, [url]);

  return (
    <div>
      <h1>Atualizar Cadastro</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Feito!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Desenvolvedor atualizado com sucesso
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
          Ocorreu um erro ao atualizar o desenvolvedor
        </Notification>
      )}
      <DeveloperForm
        buttonLabel={"Atualizar"}
        onSubmit={onSubmit}
        initialValues={developer}
      />
    </div>
  );
}
