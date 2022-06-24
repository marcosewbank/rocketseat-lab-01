import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Home(props) {
  const { user } = props;
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href='api/auth/logout'>LOGOUT</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
