import React from 'react';
import {
  StyleSheet,
  Document,
  Page,
  View,
  Text,
  Image,
  Font
} from '@react-pdf/renderer';

import LogoTwz from '../../../assets/images/logo/logo_twz_azul.png';
import LogoTwzFooter from '../../../assets/images/logo/logo_tweeze_branco.png';
import NunitoBold from '../../../assets/fonts/NunitoSans-Bold.ttf';
import NunitoExtraBold from '../../../assets/fonts/NunitoSans-ExtraBold.ttf';
import NunitoRegular from '../../../assets/fonts/NunitoSans-Regular.ttf';
import NunitoLightItalic from '../../../assets/fonts/NunitoSans-LightItalic.ttf';

Font.register({
  family: 'NunitoSansRegular',
  format: 'truetype',
  src: NunitoRegular
});

Font.register({
  family: 'NunitoSansBold',
  format: 'truetype',
  src: NunitoBold
});

Font.register({
  family: 'NunitoSansExtraBold',
  format: 'truetype',
  src: NunitoExtraBold
});

Font.register({
  family: 'NunitoSansLightItalic',
  format: 'truetype',
  src: NunitoLightItalic
});

Font.registerHyphenationCallback((word) => {
  const middle = Math.floor(word.length / 1);
  const parts =
    word.length === 1 ? [word] : [word.substr(0, middle), word.substr(middle)];

  return parts;
});

const month = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro'
};

const formatedDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()} de ${
    month[dateObj.getMonth()]
  } de ${dateObj.getFullYear()}`;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontSize: '12px'
  },
  firstPage: {
    backgroundColor: '#09407e',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoWrapper: {
    position: 'absolute',
    right: '-250px',
    bottom: '-270px',
    padding: '250px',
    borderRadius: '100%',
    backgroundColor: 'white'
  },
  logo: {
    position: 'absolute',
    right: '250px',
    bottom: '275px',
    width: '200px'
  },
  headerText: { fontSize: '52px', fontFamily: 'NunitoSansExtraBold' },
  subheader: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '60px',
    marginRight: '130px',
    marginTop: '-60px',
    fontFamily: 'NunitoSansExtraBold',
    fontWeight: 900
  },
  author: {
    fontSize: '24px',
    marginTop: '40px',
    fontFamily: 'NunitoSansRegular'
  },
  subheaderTexts: {
    fontSize: '18px',
    marginTop: '15px',
    fontFamily: 'NunitoSansRegular'
  },
  newsWrapper: { display: 'flex', flexDirection: 'column', padding: '40px' },
  newsHeader: {
    fontSize: '34px',
    fontFamily: 'NunitoSansExtraBold',
    color: '#09407e',
    width: '60%'
  },
  newsContent: {},
  newsTitle: {
    fontSize: '18px',
    fontFamily: 'NunitoSansBold',
    marginBottom: '10px'
  },
  newsSource: {
    fontSize: '12px',
    color: '#09407e',
    fontFamily: 'NunitoSansLightItalic',
    marginBottom: '5px'
  },
  newsDescription: { marginBottom: '7px', fontFamily: 'NunitoSansRegular' },
  lastPage: {
    backgroundColor: '#09407e',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 60px'
  },
  lastPageHeader: {
    fontSize: '56px',
    fontFamily: 'NunitoSansExtraBold',
    fontWeight: 900,
    marginTop: '-250px'
  },
  lastPageSubheader: {
    fontFamily: 'NunitoSansBold',
    fontSize: '20px',
    marginTop: '30px'
  },
  lastPageLogo: {
    width: '220px',
    position: 'absolute',
    bottom: '80px',
    left: '200px'
  },
  lastPageFooter: {
    fontFamily: 'NunitoSansRegular',
    fontSize: '14px',
    position: 'absolute',
    bottom: '50px',
    left: '180px'
  }
});

const PDFDocument = ({
  selectedNews,
  news,
  beginDate,
  endDate,
  firstName,
  lastName
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.firstPage}>
        <View style={styles.logoWrapper}>
          <Image src={LogoTwz} style={styles.logo}></Image>
        </View>
        <View style={styles.subheader}>
          <Text style={styles.headerText}>
            Relatório de Clipping Personalizado
          </Text>
          <Text style={styles.author}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.subheaderTexts}>
            Período selecionado: {formatedDate(beginDate)} até{' '}
            {formatedDate(endDate)}
          </Text>
          <Text style={styles.subheaderTexts}>
            {selectedNews?.length} notícia(s) selecionada(s)
          </Text>
        </View>
      </View>

      <View style={styles.newsWrapper}>
        <Text style={styles.newsHeader}>Listagem das matérias principais</Text>
        {selectedNews?.map((el) => (
          <View key={el} wrap={false} style={{ margin: '20px 20px 0 20px' }}>
            <Text style={styles.newsTitle}>{news[el]?._source.title}</Text>
            <View style={styles.newsContent}>
              <Text style={styles.newsDescription}>
                {news[el]?._source.description
                  ? news[el]?._source.description.trim()
                  : null}
              </Text>
              <Text style={styles.newsSource}>{news[el]?._source.source}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.lastPage} break>
        <Text style={styles.lastPageHeader}>Essas foram as suas métricas.</Text>
        <Text style={styles.lastPageSubheader}>
          Você aparece, a gente pinça. Simples assim.
        </Text>
        <Image src={LogoTwzFooter} style={styles.lastPageLogo}></Image>
        <Text style={styles.lastPageFooter}>
          @2021. Termos legais e legendas aqui
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
