// nex.js components
import Head from "next/head";
import ErrorPage from "next/error";
// app components
import Layout from "../components/layout";
// utility styles
import utilStyles from "../styles/utils.module.css";

// api endpoint
const URL = "http://80.240.21.204:1337/news?skip=12&limit=10";

// add fetched external data from API to Home props
export async function getServerSideProps(context) {
  try {
    const res = await fetch(URL);

    const data = await res.json();

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        news: data.news,
      },
    };
  } catch (error) {
    return { error: { statusCode: err.status } };
  }
}

export default function Home({ news, error }) {
  console.log(news);

  return (
    <Layout home>
      <Head>
        <title>News API</title>
        <meta name="description" content="A techSquad Next.js task" />
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>News</h2>
        {error ? (
          <Error statusCode={error.statusCode} />
        ) : (
          <ul className={utilStyles.list}>
            {news.map(({ _id, title, source, date, keywords }) => (
              <li className={utilStyles.listItem} key={_id}>
                <img src={source.url} alt={source.title} />
                <span>{source.title}</span>
                <span>{title}</span>
                <span>{date}</span>

                {keywords.map(({ _id, name, type }) => (
                  <span className="keyword" key={_id}>
                    {name}{" "}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
