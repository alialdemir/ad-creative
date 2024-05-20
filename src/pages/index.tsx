import Head from "next/head";
import RickandMortyAutocomplete from "@/components/rick-and-morty-autocomplate";
import ApolloProvider from "@/graphql/ApolloProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
 

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ApolloProvider>
          <Container>
            <RickandMortyAutocomplete />
          </Container>
        </ApolloProvider>
        ,
      </main>
    </>
  );
}