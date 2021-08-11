import React from 'react';
import {
  StyleSheet,
  Document,
  Page,
  View,
  Text,
  Image,
  Link
} from '@react-pdf/renderer';

import LogoTwz from '../assets/images/logo/logo_twz_azul.png';
import LogoTweeze from '../assets/images/logo/logo_tweeze_azul.png';

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', fontSize: '12px', padding: '20px' },
  logo: { width: '200px' },
  footerLogo: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '50px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subheader: {
    display: 'flex',
    flexDirection: 'column'
  },
  quantity: {
    marginTop: '10px',
    fontSize: '10px'
  },
  headerText: { fontSize: '28px', marginRight: '100px' },
  content: { padding: '20px' },
  newsWrapper: { display: 'flex', flexDirection: 'column', padding: '20px' },
  newsContent: {},
  newsTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' },
  newsSource: { fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' },
  newsDescription: { marginBottom: '10px' },
  newsUrl: { fontStyle: 'italic', textDecoration: 'underline' },
  newsDate: { marginBottom: '5px' }
});

const PDFDocument = ({ selectedNews = [], news = {} }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={LogoTwz} style={styles.logo}></Image>
        <View style={styles.subheader}>
          <Text style={styles.headerText}>Relatório de Notícias</Text>
          <Text style={styles.quantity}>
            {selectedNews.length} notícia(s) selecionada(s)
          </Text>
        </View>
      </View>
      <View style={styles.newsWrapper}>
        {selectedNews?.map((el) => (
          <View key={el} style={styles.content}>
            <Text style={styles.newsTitle}>
              Título da notícia: {news[el]._source.title}
            </Text>
            <Text style={styles.newsSource}>
              Fonte: {news[el]._source.source}
            </Text>
            <Text style={styles.newsDate}>
              {new Date(news[el]._source.criado).toGMTString()}
            </Text>
            <View style={styles.newsContent}>
              <Text style={styles.newsDescription}>
                {news[el]._source.description
                  ? `Descrição: ${news[el]._source.description.trim()}`
                  : null}
              </Text>

              <Link src={news[el]._source.url} style={styles.newsUrl}>
                {news[el]._source.url}
              </Link>
            </View>
          </View>
        ))}
      </View>
      <Image src={LogoTweeze} style={styles.footerLogo} fixed></Image>
    </Page>
  </Document>
);

export default PDFDocument;
