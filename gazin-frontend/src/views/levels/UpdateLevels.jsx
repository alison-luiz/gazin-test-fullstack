import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LevelForm from "../../components/LevelForm";
import { editResource, fetchFromApiById } from "../../services/apiRequests";

export default function UpdateLevels() {
  const [level, setLevel] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const { id } = useParams();
  const url = `/niveis/${id}`;

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
    const getLevel = async () => {
      const data = await fetchFromApiById(url);
      setLevel(data);
    };
    getLevel();
  }, [url]);

  return (
    <div>
      <h1>Atualizar Nível</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Feito!"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Nível atualizado com sucesso
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
          Ocorreu um erro ao atualizar o nível
        </Notification>
      )}
      <LevelForm
        buttonLabel={"Atualizar"}
        onSubmit={onSubmit}
        initialValues={level}
      />
    </div>
  );
}
