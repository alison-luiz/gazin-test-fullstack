import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import DeveloperForm from "../../components/DeveloperForm";
import { createResource } from "../../services/apiRequests";

export default function CreateDevelopers() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const onSubmit = async (values) => {
    await createResource("/desenvolvedores", values)
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

  return (
    <div>
      <h1>Incluir novo Desenvolvedor</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Feito!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Desenvolvedor cadastrado
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
          Não foi possível cadastrar
        </Notification>
      )}
      <DeveloperForm
        buttonLabel={"Incluir"}
        onSubmit={onSubmit}
        successMessage={"Desenvolvedor cadastrado"}
      />
    </div>
  );
}
