import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Atualize sua conta</Heading>

      <Row>
        <Heading as="h3">Atualizar dados do usuário</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Atualizar senha</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
