// nex.js components
import Head from "next/head";
// app components
import Layout, { siteTitle } from "../components/layout";
// get data from filesystem
import { getSortedPostsData } from "../lib/posts";
// utility styles
import utilStyles from "../styles/utils.module.css";

// add fetched external data from file system to Home props
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>{siteTitle}</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
