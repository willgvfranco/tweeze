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
  page: { backgroundColor: 'white', fontSize: '12px', padding: '10px' },
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
  headerText: { fontSize: '28px', marginRight: '100px' },
  content: { padding: '20px' },
  NewsContent: { padding: '10px' },
  newsTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' },
  newsSource: { fontSize: '16px', fontWeight: 'bold' },
  newsUrl: { fontStyle: 'italic', textDecoration: 'underline' },
  newsDate: { marginLeft: 'auto' }
});

const PDFDocument = ({ selectedNews, news }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={LogoTwz} style={styles.logo}></Image>
        <Text style={styles.headerText}>Relatório de Notícias</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        {selectedNews?.map((el) => (
          <View key={el} style={styles.content}>
            <Text style={styles.newsTitle}>{news[el]._source.title}</Text>
            <Text style={styles.newsSource}>{news[el]._source.source}</Text>
            <View style={styles.NewsContent}>
              <Text>{news[el]._source.description}</Text>

              <Link src={news[el]._source.url} style={styles.newsUrl}>
                {news[el]._source.url}
              </Link>

              <Text style={styles.newsDate}>
                {new Date(news[el]._source.criado).toGMTString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Image src={LogoTweeze} style={styles.footerLogo} fixed></Image>
    </Page>
  </Document>
);

export default PDFDocument;
