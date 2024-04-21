import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import LevelForm from "../../components/LevelForm";
import { createResource } from "../../services/apiRequests";

export default function CreateLevels() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const onSubmit = async (values) => {
    await createResource("/niveis", values)
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

    setFormValues({
      nivel: "",
    });
  };

  const [formValues, setFormValues] = useState({
    nivel: "",
  });

  return (
    <div>
      <h1>Incluir novo Nível</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Feito!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Nível cadastrado
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
      <LevelForm
        buttonLabel={"Incluir"}
        onSubmit={onSubmit}
        initialValues={formValues}
      />
    </div>
  );
}
