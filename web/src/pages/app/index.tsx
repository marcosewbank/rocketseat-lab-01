import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Home(props) {
  console.log("🚀 ~ file: index.tsx ~ line 4 ~ Home ~ props", props)
  const { user } = props;
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href='api/auth/logout'>LOGOUT</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({req,res}) => {
    console.log(getAccessToken(req,res));

    return { 
      props: {
        
      }
    }
  }
});

