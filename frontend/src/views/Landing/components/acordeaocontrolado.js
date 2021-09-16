import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: '18px',
    flexBasis: '33.33%',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px'
    }
  },
  secondaryHeading: {
    fontSize: '16px',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  },
  panelRow: {
    padding: '0 64px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 22px'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }
  }
}));

const mockData = [
  'panel5',
  'panel6',
  'panel7',
  'panel8',
  'panel9',
  'panel10',
  'panel11',
  'panel12',
  'panel13',
  'panel14',
  'panel15',
  'panel16',
  'panel17',
  'panel18',
  'panel19'
];

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ExpansionItem = ({ value, type, title, Content }) => (
    <ExpansionPanel
      expanded={expanded === value}
      onChange={handleChange(value)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${value}bh-content`}
        className={classes.panelRow}>
        <Typography className={classes.heading}>{type}</Typography>
        <Typography className={classes.secondaryHeading}>● {title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{Content}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  return (
    <div style={props.style} className={`${classes.root} ${props.className}`}>
      <ExpansionItem
        value="panel1"
        type="Tecnologia"
        title="Tweeze? O que é? De onde é? Para que serve?"
        Content={
          <>
            A Tweeze é uma startup 100% brasileira. Possuímos uma base
            presencial em Brasília, no Setor Comercial Sul, mas nos vemos como
            uma empresa sem fronteiras! Naturalmente nossa primeira notícia
            captada foi do Brasil, mas hoje já somos líderes no monitoramento de
            dados no Brasil! O nosso espírito é de crescimento!
            <br></br>
            “Para a Tweeze existem dois pilares - cliente e tecnologia” -
            Cristiano da Matta (co-fundador da Tweeze).
            <br></br>
            Aos nossos clientes, contem com a gente como parceiros estratégicos.
            Nosso compromisso é crescer sem encarecer! Oferecer suporte! Hoje
            nossa solução, ainda em fase de entrada no mercado, conhecida como
            Beta. Nesse momento já oferecemos o serviço de clipping
            jornalístico, em média 70% mais barato que outras soluções de
            mercado. Economia para você é sinal de alavancagem para a gente.
            <br></br>
            Somos apaixonados por tecnologia. Dentro das nossas soluções, estão
            funcionalidades extremamente interessantes. Inteligência artificial,
            processamento de linguagem natural, redes neurais, aprendizado
            profundo (deep learning) - tudo que parece complicado, para garantir
            a você em tempo real, o que realmente importa para a sua organização
            – dados, notícias e métricas a respeito do que falam sobre sua marca
            em tempo real.
            <br></br>
            Vamos pinçar?
          </>
        }
      />
      <ExpansionItem
        value="panel2"
        type="Tecnologia"
        title="Como chegam as informações a respeito da minha marca?"
        Content={
          <>
            Atualmente, vivenciamos a versão Beta - fase de pré-lançamento do
            serviço. Nela, a Tweeze capta e analisa dados de milhares de sites
            jornalísticos no Brasil e no mundo, além do Twitter, onde todas as
            informações chegam em 1º lugar.
            <br></br>A Tweeze intercorre aproximadamente 40 mil notícias por dia
            e milhões de outros dados em mídias sociais. Somente, no último mês
            (abril 2021), nossa inteligência artificial - Jull.IA, analisou meio
            milhão de notícias, classificando-as como positivas ou negativas.
            <br></br>
            Imagine, essa funcionalidade para você, sua marca, sua pesquisa
            científica, seu tema de interesse, o que você imaginar! Nós teremos
            as notícias e informações mais atualizadas. Se é importante para
            você, é importante para a gente.
            <br></br>
            Vamos Pinçar?
          </>
        }
      />
      <ExpansionItem
        value="panel3"
        type="Tecnologia"
        title="Como sei se o meu site favorito está sendo pinçado?"
        Content={
          <>
            Centenas dos principais sites de notícias do mundo são pinçados a
            cada 5 segundos pelo nosso sistema. A Tweeze possui milhares de
            fontes espalhadas no Brasil e no mundo. Mesmo assim, converse com um
            de nossos consultores de vendas e confirme se o seu veículo favorito
            já está sendo pinçado.
            <br></br>
            <strong>Diferenciais Tweeze</strong>
            Possuímos uma equipe permanente de inclusão de novos veículos
            jornalísticos. Caso uma fonte específica seja importante para você
            não esteja incluída no sistema, adicionamos para você!
            <br></br>
            Se é importante para você é importante para Tweeze - Vamos Pinçar?
          </>
        }
      />
      <ExpansionItem
        value="panel4"
        type="Financeiro"
        title="Como sei se o meu site favorito está sendo pinçado?"
        Content={
          <>
            Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem
            burocracia e sem cartão de crédito.. Crie uma conta, acesse o
            sistema, cadastre as palavras ou termos importantes para você. Na
            sequência, você já terá acesso às notícias mais recentes a respeito
            do que você deseja. Possuímos um plano gratuito que lhe dará direito
            a pesquisas sobre o seu tema de interesse. Por mais que as buscas
            sejam buscam ilimitadas, você não poderá exportar o relatório das
            suas notícias favoritas e também não as receberá por e-mail. No
            plano trial você terá acesso equivalente ao plano Padrão, que possui
            recursos, como: acesso a 5 grupos de palavras chaves, relatório de
            clipping, envio do clipping automatizado para e-mail de escolha.
          </>
        }
      />
      {mockData.map((el) => (
        <ExpansionItem
          value={el}
          type="Financeiro"
          title="Como sei se o meu site favorito está sendo pinçado?"
          Content={
            <>
              Sim. Sem compromisso. Te convidamos a conhecer nosso sistema sem
              burocracia e sem cartão de crédito.. Crie uma conta, acesse o
              sistema, cadastre as palavras ou termos importantes para você. Na
              sequência, você já terá acesso às notícias mais recentes a
              respeito do que você deseja. Possuímos um plano gratuito que lhe
              dará direito a pesquisas sobre o seu tema de interesse. Por mais
              que as buscas sejam buscam ilimitadas, você não poderá exportar o
              relatório das suas notícias favoritas e também não as receberá por
              e-mail. No plano trial você terá acesso equivalente ao plano
              Padrão, que possui recursos, como: acesso a 5 grupos de palavras
              chaves, relatório de clipping, envio do clipping automatizado para
              e-mail de escolha.
            </>
          }
        />
      ))}
    </div>
  );
}
