// next.js components
import Head from "next/head";
import ErrorPage from "next/error";
// app components
import Layout from "../components/layout";
// styles
import styles from "../styles/styles.module.scss";
// utility styles
import utilStyles from "../styles/utils.module.scss";

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
      <section>
        <h2 className={utilStyles.headingLg}>News</h2>
        {error ? (
          <ErrorPage statusCode={error.statusCode} />
        ) : (
          <>
            {/* card  */}
            {news.map(({ _id, title, source, created_at, keywords }) => (
              <div className={styles.card} key={_id}>
                {/* card heading */}
                <div className={styles.card__heading}>
                  <div style={{ marginRight: "30px" }}>
                    <img
                      height={128}
                      width={128}
                      className={`${utilStyles.imgResponsive} ${utilStyles.borderCircle}`}
                      src={source.url}
                      alt={source.title}
                    />
                  </div>
                  <p className={utilStyles.headingMd}>{source.title}</p>
                </div>
                {/* card content */}
                <div className={styles.card__content}>
                  <h2>{title}</h2>
                  <p>{created_at}</p>
                </div>
                {/* card keywords */}
                <div className={styles.keywords}>
                  <ul className={utilStyles.list}>
                    {keywords.map(({ _id, name, type }) => (
                      <li key={_id}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </Layout>
  );
}
