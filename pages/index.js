import { useEffect, useState, useRef } from "react";
// next.js components
import Head from "next/head";
import ErrorPage from "next/error";
// app components
import Layout from "../components/layout";
// utils functions
// import fetchQuery from "../utils/fetch";
// styles
import styles from "../styles/styles.module.scss";
// utility styles
import utilStyles from "../styles/utils.module.scss";

// api endpoint
const URL = "http://80.240.21.204:1337/news?skip=12&";

// add fetched external data from API to Home props
export async function getServerSideProps() {
  try {
    const res = await fetch(`${URL}limit=10`);

    const data = await res.json();

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialData: data.news,
      },
    };
  } catch (error) {
    return { error };
  }
}

export default function Home({ initialData, error }) {
  // app state
  const [limit, setLimit] = useState(10);
  const [news, setNews] = useState(initialData);
  console.log(initialData);

  const loadingRef = useRef(null);

  const handleObserver = (entries, observer) => {
    // console.log("entry:", ...entry);
    // console.log("observer:", observer);
    entries.forEach(async (entry) => {
      if (entry.intersectionRatio > 0) {
        let newLimit = limit + 10;
        // console.log("old limit", limit);
        // console.log("new limit", newLimit);

        console.log("in the view");
        const res = await fetch(`${URL}limit=${newLimit}`);

        const newData = await res.json();

        setLimit(newLimit);
        console.log(limit);
        setNews(newData.news);
      } else {
        console.log("out of view");
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);

    observer.observe(loadingRef.current);
  }, []);

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
        <div ref={loadingRef}>
          <p>Loading...</p>
        </div>
      </section>
    </Layout>
  );
}
